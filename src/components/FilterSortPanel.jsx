import '../styles/FilterSortPanel.css';

// Panel exposing all filter/sort fields supported by the API:
// location, min/max price, min/max rating, and order_by
export default function FilterSortPanel({
  locations,
  filters,
  onChange,
  onReset,
  resultCount
}) {
  const handleField = (field) => (e) => {
    onChange({ ...filters, [field]: e.target.value });
  };

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <h3>Filters</h3>
        <button className="filter-panel__reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <select id="location" value={filters.location} onChange={handleField('location')}>
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range (₹)</label>
        <div className="filter-group__row">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.min_price}
            onChange={handleField('min_price')}
          />
          <span>–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.max_price}
            onChange={handleField('max_price')}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Rating Range</label>
        <div className="filter-group__row">
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Min"
            value={filters.min_rating}
            onChange={handleField('min_rating')}
          />
          <span>–</span>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Max"
            value={filters.max_rating}
            onChange={handleField('max_rating')}
          />
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="order_by">Sort By</label>
        <select id="order_by" value={filters.order_by} onChange={handleField('order_by')}>
          <option value="">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-rating">Rating: High to Low</option>
          <option value="rating">Rating: Low to High</option>
          <option value="name">Name: A to Z</option>
          <option value="-name">Name: Z to A</option>
        </select>
      </div>

      {typeof resultCount === 'number' && (
        <p className="filter-panel__count">{resultCount} hotel{resultCount !== 1 ? 's' : ''} found</p>
      )}
    </aside>
  );
}
