import { ethers } from 'ethers'
import { useWallet } from './hooks/useWallet'
import ConnectWalletButton from './components/ConnectWalletButton'
import MintForm from './components/MintForm'
import TransactionList from './components/TransactionList'
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
    tokenBalance,
    nfts,
    refreshNFTs,
    refreshTokenBalance,
  } = useWallet()

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors"
      role="main"
    >
      <h1
        className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
        aria-label="Ethereum Wallet Dashboard"
      >
        Ethereum Wallet Dashboard
      </h1>
      {!address ? (
        <ConnectWalletButton onClick={connectWallet} loading={loading} />
      ) : (
        <section className="w-full flex flex-col gap-4 justify-center items-center lg:flex-row lg:items-start">
          <article className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 w-full md:max-w-xl transition-colors">
            {error && (
              <p
                className="text-red-600 dark:text-red-400 mb-4 text-center"
                role="alert"
              >
                {error}
              </p>
            )}
            <WalletDetails
              address={address}
              balance={balance}
              network={network}
              tokenBalance={tokenBalance}
              nfts={nfts}
            />
            <TransactionList transactions={transactions} isLoading={loading} />
          </article>
          <MintForm
            provider={
              window.ethereum
                ? new ethers.BrowserProvider(window.ethereum)
                : null
            }
            address={address}
            refreshNFTs={refreshNFTs}
            refreshTokenBalance={refreshTokenBalance}
          />
        </section>
      )}
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
