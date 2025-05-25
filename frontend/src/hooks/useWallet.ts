import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import type { Transaction } from '../../types/ethereum'
import { ETHERSCAN_API_KEY, ETHERSCAN_API } from '../constants/etherscan'

export function useWallet() {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('0.0')
  const [network, setNetwork] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const connectWallet = useCallback(async () => {
    setError('')
    if (!window.ethereum) {
      setError('MetaMask is not installed.')
      return
    }
    setLoading(true)
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      const userAddress = accounts[0]
      setAddress(userAddress)
      const bal = await provider.getBalance(userAddress)
      setBalance(ethers.formatEther(bal))
      const net = await provider.getNetwork()
      setNetwork(net.name)

      await fetchTransactions(userAddress)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to connect wallet.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

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
    network,
    transactions,
    loading,
    error,
    connectWallet,
  }
}
