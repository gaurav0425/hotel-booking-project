import { Link } from 'react-router-dom';
import '../styles/StaticPages.css';

export default function NotFound() {
  return (
    <div className="not-found container fade-in">
      <h1 className="not-found__code">404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page or hotel you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
