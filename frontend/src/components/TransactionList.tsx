import type { Transaction } from '../../types/ethereum'
import TransactionCard from './TransactionCard'
import { useMemo } from 'react'

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  // Memoize transaction cards for performance
  const transactionCards = useMemo(
    () => transactions.map(tx => <TransactionCard key={tx.hash} tx={tx} />),
    [transactions]
  )
  return (
    <section aria-label="Last 10 Transactions">
      <h2 className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        Last 10 Transactions:
      </h2>
      <ul className="space-y-2 max-h-64 overflow-y-auto" aria-live="polite">
        {transactionCards}
      </ul>
    </section>
  )
}

export default TransactionList
