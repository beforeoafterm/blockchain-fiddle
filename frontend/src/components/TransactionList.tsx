import { useMemo } from 'react'
import type { Transaction } from '../../types/ethereum'
import LoadingIndicator from './ui/LoadingIndicator'
import TransactionCard from './TransactionCard'

interface TransactionListProps {
  isLoading: boolean
  transactions: Transaction[]
}

const TransactionList = ({ isLoading, transactions }: TransactionListProps) => {
  // Memoize transaction cards for performance
  const transactionCards = useMemo(
    () => transactions.map(tx => <TransactionCard key={tx.hash} tx={tx} />),
    [transactions]
  )

  if (isLoading) {
    return <LoadingIndicator message="Fetching transactions..." />
  } else if (transactions.length === 0) {
    return (
      <div
        className="text-gray-500 dark:text-gray-400 text-center mt-4"
        aria-live="polite"
      >
        No transactions found.
      </div>
    )
  }

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
