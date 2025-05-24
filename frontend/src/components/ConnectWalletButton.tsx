interface ConnectWalletButtonProps {
  onClick: () => void
  loading: boolean
}

const ConnectWalletButton = ({
  onClick,
  loading,
}: ConnectWalletButtonProps) => (
  <button
    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? 'Connecting...' : 'Connect Wallet'}
  </button>
)

export default ConnectWalletButton
