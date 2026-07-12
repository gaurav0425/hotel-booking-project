// ============================================================
// hotelService.js
// Centralized service layer for talking to the Demo Hotels API.
// Base API: https://demohotelsapi.pythonanywhere.com/
//
// Supported query params (per API documentation):
//   location        -> icontains search on location
//   price           -> exact price match
//   min_price       -> price__gte
//   max_price       -> price__lte
//   rating          -> exact rating match
//   min_rating      -> rating__gte
//   max_rating      -> rating__lte
//   search          -> icontains search on name AND location
//   limit           -> pagination limit
//   skip            -> pagination offset
//   order_by        -> e.g. "-rating", "price", "name"
// ============================================================

const BASE_URL = 'https://demohotelsapi.pythonanywhere.com';

/**
 * Build a query string from a params object, skipping empty/undefined values.
 * @param {Object} params
 * @returns {string}
 */
function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });

  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Fetch hotels from the API with optional filters/sorting/pagination.
 * Throws an Error with a friendly message on failure.
 *
 * @param {Object} params - query params supported by the API
 * @returns {Promise<{count:number, returned:number, data:Array}>}
 */
export async function fetchHotels(params = {}) {
  const url = `${BASE_URL}/hotels/${buildQueryString(params)}`;

  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new Error(
      'Unable to reach the hotel service. Please check your internet connection and try again.'
    );
  }

  if (!response.ok) {
    throw new Error(
      `The hotel service responded with an error (status ${response.status}). Please try again later.`
    );
  }

  let json;
  try {
    json = await response.json();
  } catch (parseError) {
    throw new Error('Received an unreadable response from the hotel service.');
  }

  if (json.status && json.status !== 200) {
    throw new Error(json.message || 'The hotel service returned an unexpected error.');
  }

  return {
    count: json.count ?? (json.data ? json.data.length : 0),
    returned: json.returned ?? (json.data ? json.data.length : 0),
    data: json.data || []
  };
}

/**
 * Fetch a single hotel by its ID.
 * @param {string|number} id
 * @returns {Promise<Object>} hotel object
 */
export async function fetchHotelById(id) {
  const url = `${BASE_URL}/hotels/${id}/`;

  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    throw new Error(
      'Unable to reach the hotel service. Please check your internet connection and try again.'
    );
  }

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error(
      `The hotel service responded with an error (status ${response.status}). Please try again later.`
    );
  }

  let json;
  try {
    json = await response.json();
  } catch (parseError) {
    throw new Error('Received an unreadable response from the hotel service.');
  }

  // The single-hotel endpoint may return the object directly or wrapped in `data`
  const hotel = json.data && !Array.isArray(json.data) ? json.data : json.data?.[0] || json;

  if (!hotel || !hotel.id) {
    throw new Error('NOT_FOUND');
  }

  return hotel;
}

/**
 * Extract a sorted list of unique locations from a list of hotels.
 * Used to populate the location filter dropdown from real API data only.
 * @param {Array} hotels
 * @returns {string[]}
 */
export function extractUniqueLocations(hotels) {
  const locations = new Set(hotels.map((h) => h.location).filter(Boolean));
  return Array.from(locations).sort();
}
