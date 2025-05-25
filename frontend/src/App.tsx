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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 w-full max-w-md transition-colors">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Ethereum Wallet Dashboard
        </h1>
        {!address ? (
          <ConnectWalletButton onClick={connectWallet} loading={loading} />
        ) : (
          <WalletDetails address={address} balance={balance} />
        )}
        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4 text-center">
            {error}
          </p>
        )}
        {address && !loading && transactions.length === 0 && !error && (
          <div className="text-gray-500 dark:text-gray-400 text-center mt-4">
            No transactions found.
          </div>
        )}
        {address && transactions.length > 0 && !loading && (
          <TransactionList transactions={transactions} />
        )}
      </section>
      <footer className="mt-8 text-gray-400 dark:text-gray-500 text-xs text-center">
        Powered by ethers.js & Etherscan API
      </footer>
    </main>
  )
}

export default App
