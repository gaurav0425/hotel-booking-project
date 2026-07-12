import '../styles/StarRating.css';

// Renders a star rating (supports halves) plus the numeric value from the API
export default function StarRating({ rating = 0, size = 'md' }) {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2; // nearest half

  for (let i = 1; i <= 5; i++) {
    if (rounded >= i) {
      stars.push('full');
    } else if (rounded + 0.5 === i) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return (
    <span className={`star-rating star-rating--${size}`} aria-label={`Rated ${rating} out of 5`}>
      {stars.map((type, idx) => (
        <span key={idx} className={`star star--${type}`}>
          ★
        </span>
      ))}
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </span>
  );
}
