import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { EthereumAccountService } from './services/EthereumAccountService.js'

// Load environment variables
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL ?? ''
const REDIS_URL = process.env.REDIS_URL
const MONGODB_URI = process.env.MONGODB_URI

// Validate required environment variables
if (!ETHEREUM_RPC_URL) {
  console.error('Error: ETHEREUM_RPC_URL is not set in environment variables.')
  process.exit(1)
}
if (!REDIS_URL) {
  console.error('Error: REDIS_URL is not set in environment variables.')
  process.exit(1)
}
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not set in environment variables.')
  process.exit(1)
}

// Create EthereumAccountService instance with validated env vars
const accountService = new EthereumAccountService(
  ETHEREUM_RPC_URL,
  REDIS_URL,
  MONGODB_URI
)

// Use function syntax to avoid Express type inference issues
app.get('/api/account/:address', function (req, res) {
  ;(async () => {
    const { address } = req.params
    try {
      const info = await accountService.getAccountInfo(address)
      return res.json(info)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch account data.'
      const status = message === 'Invalid Ethereum address.' ? 400 : 500
      console.error(err)
      return res.status(status).json({ error: message })
    }
  })()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
