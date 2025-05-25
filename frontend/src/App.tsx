import { useWallet } from './hooks/useWallet'
import TransactionList from './components/TransactionList'
import ConnectWalletButton from './components/ConnectWalletButton'
import WalletDetails from './components/WalletDetails'

function App() {
  const {
    address,
    balance,
    transactions,
    loading,
    error,
    connectWallet,
    network,
  } = useWallet()

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors"
      role="main"
    >
      <section
        className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 w-full max-w-md transition-colors"
        aria-label="Ethereum Wallet Dashboard"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Ethereum Wallet Dashboard
        </h1>
        {error && (
          <p
            className="text-red-600 dark:text-red-400 mb-4 text-center"
            role="alert"
          >
            {error}
          </p>
        )}
        {!address ? (
          <ConnectWalletButton onClick={connectWallet} loading={loading} />
        ) : (
          <>
            <WalletDetails
              address={address}
              balance={balance}
              network={network}
            />
            <TransactionList transactions={transactions} isLoading={loading} />
          </>
        )}
      </section>
      <footer
        className="mt-8 text-gray-400 dark:text-gray-500 text-xs text-center"
        aria-label="Powered by ethers.js & Etherscan API"
      >
        Powered by ethers.js & Etherscan API
      </footer>
    </main>
  )
}

export default App
