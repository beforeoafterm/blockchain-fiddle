import { useState } from 'react'
import { ethers } from 'ethers'
import type { Transaction } from '../../types/ethereum'
import { ETHERSCAN_API, ETHERSCAN_API_KEY } from '../constants/etherscan'

export function useWallet() {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const connectWallet = async (): Promise<void> => {
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

  const fetchTransactions = async (userAddress: string): Promise<void> => {
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

  return {
    address,
    balance,
    transactions,
    loading,
    error,
    connectWallet,
  }
}
