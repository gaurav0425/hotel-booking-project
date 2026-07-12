import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';

// Simple back navigation button used on detail/inner pages
export default function BackButton({ fallback = '/hotels' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button className="back-btn" onClick={handleClick} aria-label="Go back">
      ← Back
    </button>
  );
}
