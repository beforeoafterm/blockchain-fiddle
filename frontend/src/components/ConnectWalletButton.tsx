interface ConnectWalletButtonProps {
  onClick: () => void
  loading: boolean
}

const ConnectWalletButton = ({
  onClick,
  loading,
}: ConnectWalletButtonProps) => (
  <button
    className="w-fit px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? 'Connecting...' : 'Connect MetaMask'}
  </button>
)

export default ConnectWalletButton
