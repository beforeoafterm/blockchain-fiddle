interface WalletDetailsProps {
  address: string
  balance: string
}

const WalletDetails = ({ address, balance }: WalletDetailsProps) => (
  <>
    <div className="mb-4">
      <h2 className="text-gray-700 text-sm mb-2">Connected Address:</h2>
      <p className="font-mono break-all text-blue-700">{address}</p>
    </div>
    <div className="mb-4">
      <h2 className="text-gray-700 text-sm">ETH Balance:</h2>
      <p className="font-bold text-lg">{balance} ETH</p>
    </div>
  </>
)

export default WalletDetails
