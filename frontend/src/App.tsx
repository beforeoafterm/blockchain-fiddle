import type { Transaction } from '../types/ethereum'

import { useState } from 'react'
import { ethers } from 'ethers'

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
    setError('')
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Ethereum Wallet Dashboard
        </h1>
        {!address ? (
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="mb-4">
            <div className="text-gray-700 text-sm mb-2">Connected Address:</div>
            <div className="font-mono break-all text-blue-700">{address}</div>
          </div>
        )}
        {address && (
          <div className="mb-4">
            <div className="text-gray-700 text-sm">ETH Balance:</div>
            <div className="font-bold text-lg">{balance} ETH</div>
          </div>
        )}
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        {address && transactions.length > 0 && (
          <div>
            <div className="text-gray-700 text-sm mb-2">
              Last 10 Transactions:
            </div>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.map(tx => (
                <li key={tx.hash} className="border rounded p-2 text-xs">
                  <div>
                    <span className="font-semibold">Hash:</span>{' '}
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {tx.hash.slice(0, 18)}...
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold">From:</span>{' '}
                    {tx.from.slice(0, 8)}...{' '}
                    <span className="font-semibold">To:</span>{' '}
                    {tx.to.slice(0, 8)}...
                  </div>
                  <div>
                    <span className="font-semibold">Value:</span>{' '}
                    {ethers.formatEther(tx.value)} ETH
                  </div>
                  <div>
                    <span className="font-semibold">Time:</span>{' '}
                    {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-8 text-gray-400 text-xs text-center">
        Powered by ethers.js & Etherscan API
      </div>
    </div>
  )
}

export default App
