import type { Transaction } from '../types/ethereum'

import { useState } from 'react'
import { ethers } from 'ethers'

import TransactionList from './components/TransactionList'
import ConnectWalletButton from './components/ConnectWalletButton'
import WalletDetails from './components/WalletDetails'
import './App.css'

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY ?? ''
const ETHERSCAN_API = 'https://api.etherscan.io/api'

function App() {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const connectWallet = async () => {
    setError('')

    if (!window.ethereum) {
      setError('MetaMask is not installed.')
      return
    }

    try {
      setLoading(true)
      const provider = new ethers.BrowserProvider(
        window.ethereum as unknown as ethers.Eip1193Provider
      )
      const accounts = (await provider.send(
        'eth_requestAccounts',
        []
      )) as string[]

      const userAddress = accounts[0]
      setAddress(userAddress)

      const bal = await provider.getBalance(userAddress)
      setBalance(ethers.formatEther(bal))

      await fetchTransactions(userAddress)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to connect wallet.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async (userAddress: string) => {
    try {
      const url = `${ETHERSCAN_API}?module=account&action=txlist&address=${userAddress}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.status !== '1') {
        setTransactions([])
        setError('No transactions found or API error.')
        return
      }
      setTransactions(data.result.slice(0, 10))
    } catch (err) {
      // Log error for debugging, show user-friendly message
      console.error('Failed to fetch transactions:', err)
      setError('Failed to fetch transactions.')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <section className="bg-white shadow rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Ethereum Wallet Dashboard
        </h1>
        {!address ? (
          <ConnectWalletButton onClick={connectWallet} loading={loading} />
        ) : (
          <WalletDetails address={address} balance={balance} />
        )}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {address && transactions.length > 0 && (
          <TransactionList transactions={transactions} />
        )}
      </section>
      <footer className="mt-8 text-gray-400 text-xs text-center">
        Powered by ethers.js & Etherscan API
      </footer>
    </main>
  )
}

export default App
