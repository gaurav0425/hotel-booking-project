import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHotels } from '../services/hotelService.js';
import HotelCard from '../components/HotelCard.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import '../styles/Home.css';

const CITY_HIGHLIGHTS = [
  { name: 'Mumbai', emoji: '🌆' },
  { name: 'Goa', emoji: '🏖️' },
  { name: 'Jaipur', emoji: '🏰' },
  { name: 'Delhi', emoji: '🕌' },
  { name: 'Bengaluru', emoji: '🌳' },
  { name: 'Hyderabad', emoji: '🍛' }
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const loadFeatured = async () => {
    setLoading(true);
    setError(null);
    try {
      // Highest rated hotels first, limited to 6, using the API's order_by + limit support
      const result = await fetchHotels({ order_by: '-rating', limit: 6 });
      setFeatured(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    navigate(`/hotels${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="fade-in">Find Your Perfect Stay, Anywhere in India</h1>
          <p className="hero__subtitle fade-in">
            Compare real hotel listings by price, rating, and location — all in one place.
          </p>

          <form className="hero__search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hotel name or city (e.g. Goa, Regal Crescent)"
              aria-label="Search hotels"
            />
            <button type="submit" className="btn btn-accent">
              Search Hotels
            </button>
          </form>

          <div className="hero__cities">
            {CITY_HIGHLIGHTS.map((city) => (
              <button
                key={city.name}
                className="hero__city-chip"
                onClick={() => navigate(`/hotels?location=${encodeURIComponent(city.name)}`)}
              >
                <span>{city.emoji}</span> {city.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="section container">
        <h2 className="section-title">Top Rated Hotels</h2>
        <p className="section-subtitle">
          A curated selection of our highest-rated stays, pulled live from our hotel database.
        </p>

        {error && <ErrorMessage message={error} onRetry={loadFeatured} />}

        {!error && (
          <div className="hotel-grid">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : featured.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
          </div>
        )}

        <div className="home__cta-wrap">
          <button className="btn btn-primary" onClick={() => navigate('/hotels')}>
            Browse All Hotels
          </button>
        </div>
      </section>

      {/* Value Props */}
      <section className="section container">
        <div className="value-props">
          <div className="value-card">
            <span className="value-card__icon">⚡</span>
            <h3>Real-Time Listings</h3>
            <p>Every hotel shown is fetched live from our hotel search API — no stale data.</p>
          </div>
          <div className="value-card">
            <span className="value-card__icon">🎯</span>
            <h3>Powerful Filters</h3>
            <p>Narrow results by location, price range, and rating to find exactly what you need.</p>
          </div>
          <div className="value-card">
            <span className="value-card__icon">💎</span>
            <h3>Transparent Pricing</h3>
            <p>See per-night pricing upfront on every hotel card and detail page.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
