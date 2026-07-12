# StayFinder — Hotel Booking Frontend

A fully responsive Hotel Booking frontend built with **React (Vite)**, **HTML5**, and **plain CSS3** (no Tailwind/Bootstrap). All hotel data is fetched live from the public **Demo Hotels API** — there is no mock data, local JSON, or hardcoded hotel information anywhere in this project.

## 🔗 API Used

- Base URL: `https://demohotelsapi.pythonanywhere.com/`
- Endpoint: `GET /hotels/`
- Supported query parameters (all wired up in the UI):
  - `search` — search by hotel name or location
  - `location` — filter by exact/partial location match
  - `min_price`, `max_price` — filter by price range
  - `min_rating`, `max_rating` — filter by rating range
  - `order_by` — sort by `price`, `-price`, `rating`, `-rating`, `name`, `-name`
  - `limit`, `skip` — pagination

## ✨ Features

- Home page with hero search, city shortcuts, and top-rated hotels
- Hotels listing page with live search, filters, sorting, and pagination
- Hotel details page with full photo gallery, description, and pricing
- About & Contact pages
- Custom 404 Not Found page
- Loading skeletons + spinners, API error handling with retry, and empty states
- Fully responsive (mobile, tablet, desktop)
- Scroll-to-top button, back button, smooth hover/transition animations
- Clean, reusable component architecture

## 📁 Folder Structure

```
src/
 ├── components/     # Reusable UI components (Navbar, HotelCard, Filters, etc.)
 ├── pages/          # Route-level pages (Home, Hotels, HotelDetails, About, Contact, NotFound)
 ├── services/       # hotelService.js — all API calls live here
 ├── assets/         # Static assets (if any)
 ├── styles/         # Component-scoped CSS files + global design tokens
 ├── App.jsx         # Route definitions & app shell
 └── main.jsx        # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```bash
# 1. Extract/clone the project, then install dependencies
npm install
```

### Run in Development

```bash
npm run dev
```

The app will start at `http://localhost:5173` (Vite will open it automatically).

### Build for Production

```bash
npm run build
```

Outputs an optimized production build to the `dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- React 18 (Functional Components + Hooks)
- React Router v6
- Vite (build tool)
- Fetch API for HTTP requests
- Hand-written CSS3 (custom properties / design tokens, flexbox, grid)

## 📝 Notes

- The "Book Now" button is a UI placeholder — the demo API does not expose a booking/reservation endpoint.
- The Contact form validates client-side only, since no messaging endpoint is provided by the API.
- All images, prices, ratings, and descriptions come directly from the API response — nothing is hardcoded.

## 📄 License

Mit Licence
