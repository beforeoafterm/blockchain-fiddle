interface WalletDetailsProps {
  address: string
  balance: string
}

const WalletDetails = ({ address, balance }: WalletDetailsProps) => (
  <>
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
  </>
)

export default WalletDetails
