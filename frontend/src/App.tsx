import { useWallet } from './hooks/useWallet'

import TransactionList from './components/TransactionList'
import ConnectWalletButton from './components/ConnectWalletButton'
import WalletDetails from './components/WalletDetails'

function App() {
  const { address, balance, transactions, loading, error, connectWallet } =
    useWallet()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 w-full max-w-md transition-colors">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Ethereum Wallet Dashboard
        </h1>
        {!address ? (
          <ConnectWalletButton onClick={connectWallet} loading={loading} />
        ) : (
          <WalletDetails address={address} balance={balance} />
        )}
        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4 text-center">
            {error}
          </p>
        )}
        {address && !loading && transactions.length === 0 && !error && (
          <div className="text-gray-500 dark:text-gray-400 text-center mt-4">
            No transactions found.
          </div>
        )}
        {address && transactions.length > 0 && !loading && (
          <TransactionList transactions={transactions} />
        )}
      </section>
      <footer className="mt-8 text-gray-400 dark:text-gray-500 text-xs text-center">
        Powered by ethers.js & Etherscan API
      </footer>
    </main>
  )
}

export default App
