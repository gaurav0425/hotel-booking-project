import '../styles/StaticPages.css';

export default function About() {
  return (
    <div className="static-page container fade-in">
      <h1>About StayFinder</h1>
      <p className="static-page__lead">
        StayFinder is a demo hotel booking frontend built to showcase a clean, modern React
        application powered entirely by live API data — no mock data, no hardcoded hotels.
      </p>

      <section className="static-section">
        <h2>What We Do</h2>
        <p>
          We help travelers discover and compare hotels across major Indian cities. Every hotel
          listing you see — including its name, price, rating, location, and photos — is fetched
          in real time from our hotel search API.
        </p>
      </section>

      <section className="static-section">
        <h2>Our Data Source</h2>
        <p>
          All listings on this site come from the publicly available Hotel Search API
          (demohotelsapi.pythonanywhere.com). The API supports rich filtering by location, price
          range and rating, as well as sorting and pagination, which powers the search experience
          throughout this app.
        </p>
      </section>

      <section className="static-section">
        <h2>Built With</h2>
        <ul className="static-list">
          <li>React (Functional Components + Hooks)</li>
          <li>React Router for client-side navigation</li>
          <li>Vanilla CSS3 — fully responsive, no UI frameworks</li>
          <li>The Fetch API for all network requests</li>
        </ul>
      </section>
    </div>
  );
}
