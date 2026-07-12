import { Link } from 'react-router-dom';
import '../styles/Footer.css';

// Responsive site footer
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__brand">
            <span className="navbar__logo">🏨</span> StayFinder
          </div>
          <p className="footer__tagline">
            Discover and compare hotels across India, powered by live data.
          </p>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Popular Cities</h4>
          <ul>
            <li><Link to="/hotels?location=Mumbai">Mumbai</Link></li>
            <li><Link to="/hotels?location=Delhi">Delhi</Link></li>
            <li><Link to="/hotels?location=Goa">Goa</Link></li>
            <li><Link to="/hotels?location=Jaipur">Jaipur</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Data Source</h4>
          <p className="footer__tagline">
            All hotel data is fetched live from the Demo Hotels API.
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {year} StayFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}
