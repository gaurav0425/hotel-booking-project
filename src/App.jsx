import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTopButton, { ScrollToTopOnNavigate } from './components/ScrollToTop.jsx';

import Home from './pages/Home.jsx';
import Hotels from './pages/Hotels.jsx';
import HotelDetails from './pages/HotelDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// Root application component: lays out the persistent Navbar/Footer
// and defines all client-side routes.
export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTopOnNavigate />
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
