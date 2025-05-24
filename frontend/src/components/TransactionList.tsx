import type { Transaction } from '../../types/ethereum'
import TransactionCard from './TransactionCard'

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList = ({ transactions }: TransactionListProps) => (
  <div>
    <h2 className="text-gray-700 text-sm mb-2">Last 10 Transactions:</h2>
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {transactions.map(tx => (
        <TransactionCard key={tx.hash} tx={tx} />
      ))}
    </ul>
  </div>
)

export default TransactionList
