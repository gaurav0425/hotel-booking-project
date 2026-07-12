import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';
import '../styles/HotelCard.css';

// Displays a single hotel's summary: image, name, location, price, rating, description
export default function HotelCard({ hotel }) {
  const { id, name, location, price, rating, thumbnail, description } = hotel;

  return (
    <Link to={`/hotels/${id}`} className="hotel-card fade-in">
      <div className="hotel-card__img-wrap">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><rect width="100%" height="100%" fill="%23e3e1db"/></svg>';
          }}
        />
        <span className="hotel-card__price-badge">₹{Number(price).toLocaleString('en-IN')}<small>/night</small></span>
      </div>

      <div className="hotel-card__body">
        <h3 className="hotel-card__name">{name}</h3>
        <p className="hotel-card__location">📍 {location}</p>
        <StarRating rating={Number(rating)} />
        <p className="hotel-card__description">{description}</p>
        <span className="hotel-card__cta">View Details →</span>
      </div>
    </Link>
  );
}
