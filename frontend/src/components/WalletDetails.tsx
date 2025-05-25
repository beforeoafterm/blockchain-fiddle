interface WalletDetailsProps {
  address: string
  balance: string
  network: string
  tokenBalance?: string
  nfts?: string[]
}

const WalletDetails = ({
  address,
  balance,
  network,
  tokenBalance,
  nfts,
}: WalletDetailsProps) => (
  <section aria-label="Wallet Details">
    <div className="mb-4">
      <h2 className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        Network:
      </h2>
      <p className="font-mono break-all text-blue-700 dark:text-blue-400">
        {network}
      </p>
    </div>
    <div className="mb-4">
      <h2 className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        Connected Address:
      </h2>
      <p className="font-mono break-all text-blue-700 dark:text-blue-400">
        {address}
      </p>
    </div>
    <div className="mb-4">
      <h2 className="text-gray-700 dark:text-gray-300 text-sm">ETH Balance:</h2>
      <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
        {balance} ETH
      </p>
    </div>
    <div className="mb-4">
      <h2 className="text-gray-700 dark:text-gray-300 text-sm">
        Neu Token Balance:
      </h2>
      <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
        {tokenBalance ?? '0'}
      </p>
    </div>
    <div className="mb-4">
      <h2 className="text-gray-700 dark:text-gray-300 text-sm">
        Owned Neu NFTs:
      </h2>
      {nfts && nfts.length > 0 ? (
        <ul className="list-disc ml-6">
          {nfts.map(id => (
            <li key={id} className="font-mono text-blue-700 dark:text-blue-400">
              Token ID: {id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">None</p>
      )}
    </div>
  </section>
)

export default WalletDetails
