import '../styles/StatusStates.css';

// A single skeleton placeholder card, mimicking the HotelCard layout,
// shown in a grid while hotel data is loading.
export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__img"></div>
      <div className="skeleton-card__body">
        <div className="skeleton-line" style={{ width: '70%' }}></div>
        <div className="skeleton-line skeleton-line--short"></div>
        <div className="skeleton-line" style={{ width: '90%' }}></div>
        <div className="skeleton-line skeleton-line--short"></div>
      </div>
    </div>
  );
}
