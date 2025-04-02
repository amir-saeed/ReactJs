import React from 'react';
import Container from '../shared/Container';

const Newsletter: React.FC = () => {
  return (
    <section className="newsletter">
      <Container className="newsletter__container">
        <h2 className="newsletter__title">Get Travel Inspiration</h2>
        <p className="newsletter__description">
          Subscribe to our newsletter and receive exclusive deals, travel tips, and destination guides.
        </p>
        
        <form className="newsletter__form">
          <input type="email" placeholder="Your email address" aria-label="Email for newsletter" required />
          <button type="submit">Subscribe</button>
        </form>
      </Container>
    </section>
  );
};

export default Newsletter;