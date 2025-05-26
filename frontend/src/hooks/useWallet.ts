import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import type { Transaction } from '../../types/ethereum'
import { ETHERSCAN_API_KEY, ETHERSCAN_API } from '../constants/etherscan'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export function useWallet() {
  const [address, setAddress] = useState<string>('')
  const [balance, setBalance] = useState<string>('0.0')
  const [network, setNetwork] = useState<string>('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const [tokenBalance, setTokenBalance] = useState<string>('0')
  const [nfts, setNfts] = useState<string[]>([])

  // Fetch ERC-20 token balance from backend
  const fetchTokenBalance = useCallback(async (userAddress: string) => {
    try {
      const res = await fetch(`${API_URL}/api/token-balance/${userAddress}`)
      if (!res.ok) throw new Error('Failed to fetch token balance')
      const data = await res.json()
      setTokenBalance(ethers.formatEther(data.balance))
    } catch {
      setTokenBalance('0')
    }
  }, [])

  // Fetch owned NFTs from backend
  const fetchNFTs = useCallback(async (userAddress: string) => {
    try {
      const res = await fetch(`${API_URL}/api/nfts/${userAddress}`)
      if (!res.ok) throw new Error('Failed to fetch NFTs')
      const data = await res.json()
      setNfts(data.nfts)
    } catch {
      setNfts([])
    }
  }, [])

  const fetchTransactions = useCallback(
    async (userAddress: string): Promise<void> => {
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
    },
    []
  )

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
      await fetchTokenBalance(userAddress)
      await fetchNFTs(userAddress)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to connect wallet.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [fetchTokenBalance, fetchNFTs, fetchTransactions])

  return {
    address,
    balance,
    network,
    transactions,
    loading,
    error,
    connectWallet,
    tokenBalance,
    nfts,
  }
}
