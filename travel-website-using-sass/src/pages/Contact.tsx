import React from 'react';
import Container from '../components/shared/Container';
import Button from '../components/shared/Button';

const Contact: React.FC = () => {
  return (
    <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
      <Container>
        <div className="section-title" style={{ marginTop: '2rem' }}>
          <h1>Contact Us</h1>
          <p>Have questions or need assistance? We're here to help!</p>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="subject" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #ddd'
                }}
                required
              ></textarea>
            </div>
            
            <Button type="submit" variant="primary">Send Message</Button>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Contact;