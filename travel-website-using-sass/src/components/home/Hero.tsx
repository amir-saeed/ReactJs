import React from 'react';
import Button from '../shared/Button';
import Container from '../shared/Container';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <Container className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">Discover Your Perfect Getaway</h1>
          <p className="hero__subtitle">
            Explore breathtaking destinations and create unforgettable memories with our expertly curated travel experiences.
          </p>
          <div className="hero__cta">
            <Button variant="primary" size="large" href="/destinations">
              Explore Destinations
            </Button>
            <Button variant="outline" size="large" href="/about">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;