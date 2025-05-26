import { useState } from 'react'
import { ethers } from 'ethers'
import { NEU_TOKEN_ABI, NEU_NFT_ABI } from '../constants/contractAbis'
import {
  NEU_TOKEN_ADDRESS,
  NEU_NFT_ADDRESS,
} from '../constants/contractAddresses'

interface MintUIProps {
  provider: ethers.BrowserProvider | null
  address: string
  refreshTokenBalance: () => Promise<void>
  refreshNFTs: () => Promise<void>
}

const MintForm = ({
  provider,
  address,
  refreshTokenBalance,
  refreshNFTs,
}: MintUIProps) => {
  const [minting, setMinting] = useState(false)
  const [mintError, setMintError] = useState('')
  const [mintSuccess, setMintSuccess] = useState('')
  const [mintType, setMintType] = useState<'erc20' | 'erc721'>('erc20')
  const [amount, setAmount] = useState('1')

  const handleMint = async () => {
    setMintError('')
    setMintSuccess('')

    if (!provider) {
      setMintError('Wallet not connected')
      return
    }

    setMinting(true)
    const mint = mintType === 'erc20' ? mintErc20 : mintErc721

    try {
      await mint(provider)
    } catch (e) {
      console.log('Mint error:', e)
      handleError(e)
    } finally {
      setMinting(false)
    }
  }

  const mintErc20 = async (provider: ethers.BrowserProvider) => {
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(
      NEU_TOKEN_ADDRESS,
      NEU_TOKEN_ABI,
      signer
    )
    const tx = await contract.mint(address, ethers.parseUnits(amount, 18))
    await tx.wait()
    setMintSuccess(`Minted ${amount} NeuToken!`)
    await refreshTokenBalance()
  }

  const mintErc721 = async (provider: ethers.BrowserProvider) => {
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(NEU_NFT_ADDRESS, NEU_NFT_ABI, signer)
    const tx = await contract.mint(address)
    await tx.wait()
    setMintSuccess('Minted a NeuNFT!')
    await refreshNFTs()
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes('ACTION_REJECTED'))
        return setMintError('Transaction rejected by user')
      else if (error.message.includes('UNPREDICTABLE_GAS_LIMIT'))
        return setMintError('Transaction failed due to gas limit issues')
      else if (error.message.includes('INSUFFICIENT_FUNDS'))
        return setMintError('Insufficient funds for transaction')
      else return setMintError(`Transaction failed: ${error.message}`)
    }
    setMintError('Mint failed')
  }

  const contractName = mintType === 'erc20' ? 'NeuToken' : 'NeuNFT'

  return (
    <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md w-full md:max-w-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Mint Tokens
      </h2>
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          className={`flex-1 p-2 rounded-lg font-medium transition-colors
            ${
              mintType === 'erc20'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }
          `}
          aria-pressed={mintType === 'erc20'}
          onClick={() => setMintType('erc20')}
        >
          NeuToken
          <br className="hidden sm:block" /> (ERC-20)
        </button>
        <button
          type="button"
          className={`flex-1 p-2 rounded-lg font-medium transition-colors
            ${
              mintType === 'erc721'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }
          `}
          aria-pressed={mintType === 'erc721'}
          onClick={() => setMintType('erc721')}
        >
          NeuNFT
          <br className="hidden sm:block" /> (ERC-721)
        </button>
      </div>
      {mintType === 'erc20' && (
        <div className="mb-4">
          <label
            htmlFor="mint-amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Amount to Mint
          </label>
          <input
            id="mint-amount"
            type="number"
            min="1"
            step="1"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            disabled={minting}
          />
        </div>
      )}
      <button
        type="button"
        className={`w-full py-2 rounded-lg font-semibold text-lg transition-colors
          ${
            minting
              ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-md'
          }
        `}
        onClick={handleMint}
        disabled={minting}
      >
        {minting ? 'Minting...' : `Mint ${contractName}`}
      </button>
      {mintError && (
        <div className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 rounded p-2">
          {mintError}
        </div>
      )}
      {mintSuccess && (
        <div className="mt-4 text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 rounded p-2">
          {mintSuccess}
        </div>
      )}
    </section>
  )
}

export default MintForm
