import '../styles/StatusStates.css';

// Reusable loading spinner with an optional message.
// Used while API requests are in flight.
export default function LoadingSpinner({ message = 'Loading hotels...' }) {
  return (
    <div className="status-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  );
}
