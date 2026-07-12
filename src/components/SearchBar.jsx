import { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

// Debounced search input for hotel name/location.
// Calls onSearch(term) after the user pauses typing for 400ms.
export default function SearchBar({ initialValue = '', onSearch, placeholder }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔎</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || 'Search by hotel name or city...'}
        aria-label="Search hotels"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => setValue('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
