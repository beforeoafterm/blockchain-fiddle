import { ethers } from 'ethers'
import { Redis } from 'ioredis'
import mongoose from 'mongoose'
import { AccountBalance } from '../models/AccountBalance.js'

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

  async getAccountInfo(address: string) {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address.')
    }

    // Try Redis cache for blockNumber and gasPrice
    const [cachedBlock, cachedGas] = await this.redis.mget(
      'blockNumber',
      'gasPrice'
    )
    let blockNumber: number
    let gasPrice: string | null

    if (cachedBlock && cachedGas) {
      blockNumber = Number(cachedBlock)
      gasPrice = cachedGas
    } else {
      // Fetch from provider and cache
      blockNumber = await this.provider.getBlockNumber()
      const feeData = await this.provider.getFeeData()
      gasPrice = feeData.gasPrice ? feeData.gasPrice.toString() : null
      // Cache for 10 seconds
      await this.redis.mset(
        'blockNumber',
        blockNumber.toString(),
        'gasPrice',
        gasPrice ?? ''
      )
      await this.redis.expire('blockNumber', 10)
      await this.redis.expire('gasPrice', 10)
    }

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
}
