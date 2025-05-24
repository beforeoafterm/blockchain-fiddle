// Type for window.ethereum
interface EthereumProvider {
  isMetaMask?: boolean
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timeStamp: string
}
