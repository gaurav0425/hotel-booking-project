import '../styles/StatusStates.css';

// Displays an API/network error with an optional retry action
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-state status-state--error" role="alert">
      <div className="status-state__icon">⚠️</div>
      <h3>Something went wrong</h3>
      <p>{message || 'We could not load the hotel data. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
