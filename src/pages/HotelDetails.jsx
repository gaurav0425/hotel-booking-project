import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { fetchHotelById } from '../services/hotelService.js';
import StarRating from '../components/StarRating.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackButton from '../components/BackButton.jsx';
import '../styles/HotelDetails.css';

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  const loadHotel = async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const data = await fetchHotelById(id);
      setHotel(data);
      setActivePhoto(0);
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        setNotFound(true);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return (
      <div className="container">
        <LoadingSpinner message="Loading hotel details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error} onRetry={loadHotel} />
      </div>
    );
  }

  if (!hotel) return null;

  const gallery = hotel.photos && hotel.photos.length > 0 ? hotel.photos : [hotel.thumbnail];

  return (
    <div className="hotel-details container fade-in">
      <BackButton fallback="/hotels" />

      <div className="hotel-details__gallery">
        <div className="hotel-details__main-photo">
          <img src={gallery[activePhoto]} alt={`${hotel.name} view ${activePhoto + 1}`} />
        </div>
        {gallery.length > 1 && (
          <div className="hotel-details__thumbs">
            {gallery.map((photo, idx) => (
              <button
                key={idx}
                className={`hotel-details__thumb ${idx === activePhoto ? 'hotel-details__thumb--active' : ''}`}
                onClick={() => setActivePhoto(idx)}
                aria-label={`View photo ${idx + 1}`}
              >
                <img src={photo} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hotel-details__content">
        <div className="hotel-details__main">
          <h1>{hotel.name}</h1>
          <p className="hotel-details__location">📍 {hotel.location}</p>
          <StarRating rating={Number(hotel.rating)} size="lg" />

          <h2 className="hotel-details__section-title">About this hotel</h2>
          <p className="hotel-details__description">{hotel.description}</p>
        </div>

        <aside className="hotel-details__booking-card">
          <p className="hotel-details__price">
            ₹{Number(hotel.price).toLocaleString('en-IN')}
            <span> / night</span>
          </p>
          <button
            className="btn btn-primary hotel-details__book-btn"
            onClick={() => alert('Booking functionality is not part of this demo API.')}
          >
            Book Now
          </button>
          <Link to="/hotels" className="hotel-details__browse-link">
            ← Browse more hotels
          </Link>
        </aside>
      </div>
    </div>
  );
}
