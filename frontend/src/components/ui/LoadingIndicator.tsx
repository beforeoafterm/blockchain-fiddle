interface LoadingIndicatorProps {
  message?: string
}

const LoadingIndicator = ({
  message = 'Loading...',
}: LoadingIndicatorProps) => {
  return (
    <div
      className="flex flex-col justify-center items-center gap-4 my-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"
        aria-label="Loading"
      ></div>
      <p className="text-gray-700 dark:text-gray-300">{message}</p>
    </div>
  )
}

export default LoadingIndicator
