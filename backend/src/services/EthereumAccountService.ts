import { ethers } from 'ethers'
import { Redis } from 'ioredis'
import mongoose from 'mongoose'
import { AccountBalance } from '../models/AccountBalance.js'
import {
  NEU_TOKEN_ADDRESS,
  NEU_NFT_ADDRESS,
} from '../constants/contractAddresses.js'
import { NEU_TOKEN_ABI, NEU_NFT_ABI } from '../constants/contractAbis.js'

export class EthereumAccountService {
  private readonly provider: ethers.JsonRpcProvider
  private readonly redis: Redis
  private mongoConnected = false
  private mongoConnecting: Promise<void> | null = null
  private readonly mongoUri: string

  constructor(
    provider: ethers.JsonRpcProvider,
    redis: Redis,
    mongoUri: string
  ) {
    this.provider = provider
    this.redis = redis
    this.mongoUri = mongoUri
  }

  private async initMongo() {
    if (this.mongoConnected) return
    if (this.mongoConnecting) return this.mongoConnecting
    this.mongoConnecting = mongoose
      .connect(this.mongoUri, { dbName: 'blockchain_fiddle' })
      .then(() => {
        this.mongoConnected = true
      })
      .catch(() => {
        this.mongoConnected = false
      })
    return this.mongoConnecting
  }

  // Helper to get blockNumber and gasPrice (from cache or provider)
  private async getBlockAndGas(): Promise<{
    blockNumber: number
    gasPrice: string | null
  }> {
    const [cachedBlock, cachedGas] = await this.redis.mget(
      'blockNumber',
      'gasPrice'
    )

    if (cachedBlock && cachedGas) {
      return { blockNumber: Number(cachedBlock), gasPrice: cachedGas }
    }

    const blockNumber = await this.provider.getBlockNumber()
    const feeData = await this.provider.getFeeData()
    const gasPrice = feeData.gasPrice ? feeData.gasPrice.toString() : null

    await this.redis.mset(
      'blockNumber',
      blockNumber.toString(),
      'gasPrice',
      gasPrice ?? ''
    )
    await this.redis.expire('blockNumber', 10)
    await this.redis.expire('gasPrice', 10)

    return { blockNumber, gasPrice }
  }

  async getAccountInfo(address: string) {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address.')
    }

    const { blockNumber, gasPrice } = await this.getBlockAndGas()

    // Fetch balance
    const balanceBN = await this.provider.getBalance(address)
    const balance = ethers.formatEther(balanceBN)

    // Store/update in MongoDB if connected
    await this.initMongo()
    if (this.mongoConnected) {
      await AccountBalance.findOneAndUpdate(
        { address: address.toLowerCase() },
        { balance, updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    }

    return {
      address,
      balance,
      blockNumber,
      gasPrice,
    }
  }

  /**
   * Get ERC-20 token balance for a given address
   */
  async getTokenBalance(address: string): Promise<string> {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address.')
    }
    if (!NEU_TOKEN_ADDRESS) throw new Error('NEU_TOKEN_ADDRESS not set')
    const contract = new ethers.Contract(
      NEU_TOKEN_ADDRESS,
      NEU_TOKEN_ABI,
      this.provider
    )
    const balance = await contract.balanceOf(address)
    return balance.toString()
  }

  /**
   * Get owned ERC-721 NFT token IDs for a given address
   */
  async getOwnedNFTs(address: string): Promise<string[]> {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address.')
    }
    if (!NEU_NFT_ADDRESS) throw new Error('NEU_NFT_ADDRESS not set')
    const contract = new ethers.Contract(
      NEU_NFT_ADDRESS,
      NEU_NFT_ABI,
      this.provider
    )

    // Get NFT balance for address
    const balance = await contract.balanceOf(address)
    const nfts: string[] = []

    // Use ERC721Enumerable's tokenOfOwnerByIndex to get all tokens
    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i)
      nfts.push(tokenId.toString())
    }

    return nfts
  }
}
