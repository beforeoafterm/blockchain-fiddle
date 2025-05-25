import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ethers } from 'ethers'
import { Redis } from 'ioredis'
import { EthereumAccountService } from './services/EthereumAccountService.js'
import { asyncHandler } from './utils/asyncHandler.js'
import { env } from './utils/env.js'

// Load environment variables
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = Number(env.PORT)
const ETHEREUM_RPC_URL = env.ETHEREUM_RPC_URL
const REDIS_URL = env.REDIS_URL
const MONGODB_URI = env.MONGODB_URI

// Dependency injection for service
const provider = new ethers.JsonRpcProvider(ETHEREUM_RPC_URL)
const redis = new Redis(REDIS_URL)
const accountService = new EthereumAccountService(provider, redis, MONGODB_URI)

// Use asyncHandler for error handling
app.get(
  '/api/account/:address',
  asyncHandler(async (req, res) => {
    const { address } = req.params
    const info = await accountService.getAccountInfo(address)
    res.json(info)
  })
)

// Centralized error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err)
    res.status(err.status ?? 500).json({ error: err.message ?? 'Server error' })
  }
)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
