import '../styles/StatusStates.css';

// Shown when a search/filter returns zero hotels
export default function EmptyState({
  title = 'No hotels found',
  message = 'Try adjusting your search or filters to find more results.',
  actionLabel,
  onAction
}) {
  return (
    <div className="status-state status-state--empty">
      <div className="status-state__icon">🔍</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-outline" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
