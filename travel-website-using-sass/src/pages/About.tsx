import React from 'react';
import Container from '../components/shared/Container';

const About: React.FC = () => {
  return (
    <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
      <Container>
        <div className="section-title" style={{ marginTop: '2rem' }}>
          <h1>About Us</h1>
          <p>Learn more about Wanderlust Travel and our mission.</p>
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <p>
            Wanderlust Travel was founded in 2018 with a simple mission: to make extraordinary travel experiences accessible to everyone. Our team of passionate travelers and destination experts work tirelessly to curate journeys that combine adventure, culture, relaxation, and authentic local experiences.
          </p>
          <p>
            What sets us apart is our commitment to responsible tourism and our deep connections with local communities around the world. We believe that travel should not only be enjoyable but also enriching and sustainable.
          </p>
          <p>
            From the pristine beaches of Bali to the historic streets of Paris, Wanderlust Travel promises unforgettable memories and exceptional service every step of the way.
          </p>
        </div>
      </Container>
    </main>
  );
};

export default About;