import { ethers } from 'ethers'
import type { Transaction } from '../../types/ethereum'

interface TransactionCardProps {
  tx: Transaction
}

const TransactionCard = ({ tx }: TransactionCardProps) => (
  <li className="border rounded p-2 text-xs">
    <div>
      <span className="font-semibold">Hash:</span>{' '}
      <a
        href={`https://etherscan.io/tx/${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        {tx.hash.slice(0, 18)}...
      </a>
    </div>
    <div>
      <span className="font-semibold">From:</span> {tx.from.slice(0, 8)}...{' '}
      <span className="font-semibold">To:</span> {tx.to.slice(0, 8)}...
    </div>
    <div>
      <span className="font-semibold">Value:</span>{' '}
      {ethers.formatEther(tx.value)} ETH
    </div>
    <div>
      <span className="font-semibold">Time:</span>{' '}
      {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
    </div>
  </li>
)

export default TransactionCard
