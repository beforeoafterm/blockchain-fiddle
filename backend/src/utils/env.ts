import { z } from 'zod'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export const envSchema = z.object({
  PORT: z.string().default('4000'),
  ETHEREUM_RPC_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  MONGODB_URI: z.string(),
})

export const env = envSchema.parse(process.env)
