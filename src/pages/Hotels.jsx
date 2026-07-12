import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchHotels, extractUniqueLocations } from '../services/hotelService.js';
import HotelCard from '../components/HotelCard.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterSortPanel from '../components/FilterSortPanel.jsx';
import Pagination from '../components/Pagination.jsx';
import '../styles/Hotels.css';

const PAGE_SIZE = 12;

const DEFAULT_FILTERS = {
  location: '',
  min_price: '',
  max_price: '',
  min_rating: '',
  max_rating: '',
  order_by: ''
};

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [hotels, setHotels] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [allLocations, setAllLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Filters are derived from the URL so links (e.g. from Home) work directly
  const filters = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      location: searchParams.get('location') || '',
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
      min_rating: searchParams.get('min_rating') || '',
      max_rating: searchParams.get('max_rating') || '',
      order_by: searchParams.get('order_by') || ''
    }),
    [searchParams]
  );

  // Fetch the full location list once (unfiltered) to populate the dropdown with real API data
  useEffect(() => {
    fetchHotels({ limit: 500 })
      .then((res) => setAllLocations(extractUniqueLocations(res.data)))
      .catch(() => {
        /* Non-critical: filter dropdown simply stays empty on failure */
      });
  }, []);

  const loadHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiParams = {
        ...filters,
        limit: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE
      };
      const result = await fetchHotels(apiParams);
      setHotels(result.data);
      setTotalCount(result.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.location, filters.min_price, filters.max_price, filters.min_rating, filters.max_rating, filters.order_by]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === undefined || value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next);
  };

  const handleSearch = (term) => updateParams({ search: term });
  const handleFilterChange = (newFilters) => updateParams(newFilters);
  const handleReset = () => setSearchParams(new URLSearchParams());

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const hasActiveFilters =
    filters.search || filters.location || filters.min_price || filters.max_price || filters.min_rating || filters.max_rating || filters.order_by;

  return (
    <div className="hotels-page container">
      <div className="hotels-page__header">
        <h1>Explore Hotels</h1>
        <p className="section-subtitle">
          Browse hotels across India, filtered and sorted the way you like.
        </p>
        <SearchBar initialValue={filters.search} onSearch={handleSearch} />
      </div>

      <div className="hotels-page__layout">
        <FilterSortPanel
          locations={allLocations}
          filters={{ ...DEFAULT_FILTERS, ...filters }}
          onChange={handleFilterChange}
          onReset={handleReset}
          resultCount={!loading && !error ? totalCount : undefined}
        />

        <div className="hotels-page__results">
          {error && <ErrorMessage message={error} onRetry={loadHotels} />}

          {!error && loading && (
            <div className="hotel-grid">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!error && !loading && hotels.length === 0 && (
            <EmptyState
              actionLabel={hasActiveFilters ? 'Clear all filters' : undefined}
              onAction={hasActiveFilters ? handleReset : undefined}
            />
          )}

          {!error && !loading && hotels.length > 0 && (
            <>
              <div className="hotel-grid">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
