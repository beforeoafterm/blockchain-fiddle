import { ethers } from 'ethers'

export class EthereumAccountService {
  private readonly provider: ethers.JsonRpcProvider

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
  }

  async getAccountInfo(address: string) {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address.')
    }
    const [balance, blockNumber, feeData] = await Promise.all([
      this.provider.getBalance(address),
      this.provider.getBlockNumber(),
      this.provider.getFeeData(),
    ])
    return {
      address,
      balance: ethers.formatEther(balance),
      blockNumber,
      gasPrice: feeData.gasPrice ? feeData.gasPrice.toString() : null,
    }
  }
}
