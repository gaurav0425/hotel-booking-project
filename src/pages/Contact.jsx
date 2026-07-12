import { useState } from 'react';
import '../styles/StaticPages.css';
import '../styles/Contact.css';

const INITIAL_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) newErrors.message = 'Please enter a message.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // This demo has no backend endpoint to send messages to;
      // we simply confirm receipt client-side.
      setSubmitted(true);
      setForm(INITIAL_FORM);
    }
  };

  return (
    <div className="static-page container fade-in">
      <h1>Contact Us</h1>
      <p className="static-page__lead">
        Have a question, suggestion, or feedback about StayFinder? Send us a message below.
      </p>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
            ></textarea>
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>

          {submitted && (
            <p className="contact-success" role="status">
              ✅ Thank you! Your message has been received.
            </p>
          )}
        </form>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📧 support@stayfinder.example</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Bengaluru, Karnataka, India</p>
        </div>
      </div>
    </div>
  );
}
