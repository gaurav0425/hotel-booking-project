import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ScrollToTop.css';

// Two responsibilities:
// 1) Automatically scroll to top whenever the route changes
// 2) Show a floating "back to top" button once the user scrolls down
export function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'auto' : 'auto' });
  }, [pathname]);

  return null;
}

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button className="scroll-top-btn" onClick={scrollUp} aria-label="Scroll to top">
      ↑
    </button>
  );
}
