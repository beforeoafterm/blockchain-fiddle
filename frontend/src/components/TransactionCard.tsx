import { ethers } from 'ethers'
import type { Transaction } from '../../types/ethereum'

interface TransactionCardProps {
  tx: Transaction
}

const TransactionCard = ({ tx }: TransactionCardProps) => (
  <li className="border rounded p-2 text-xs bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
    <div>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        Hash:
      </span>{' '}
      <a
        href={`https://etherscan.io/tx/${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline"
        title="View on Etherscan"
      >
        {tx.hash.slice(0, 18)}...
      </a>
    </div>
    <div>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        From:
      </span>{' '}
      <span className="text-gray-600 dark:text-gray-400">
        {tx.from.slice(0, 8)}...
      </span>{' '}
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        To:
      </span>{' '}
      <span className="text-gray-600 dark:text-gray-400">
        {tx.to.slice(0, 8)}...
      </span>
    </div>
    <div>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        Value:
      </span>{' '}
      <span className="text-gray-900 dark:text-gray-100">
        {ethers.formatEther(tx.value)} ETH
      </span>
    </div>
    <div>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        Time:
      </span>{' '}
      <span className="text-gray-600 dark:text-gray-400">
        {new Date(Number(tx.timeStamp) * 1000).toLocaleString()}
      </span>
    </div>
  </li>
)

export default TransactionCard
