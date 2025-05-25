import mongoose from 'mongoose'

const AccountBalanceSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true, index: true },
  balance: { type: String, required: true }, // Store as string for precision
  updatedAt: { type: Date, default: Date.now },
})

export const AccountBalance = mongoose.model(
  'AccountBalance',
  AccountBalanceSchema
)
