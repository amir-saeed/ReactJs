import Container from '../shared/Container';
import Button from '../shared/Button';
import { FooterColumn } from '../../types';

const quickLinks: FooterColumn = {
  id: 1,
  title: 'Quick Links',
  links: [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'About Us', path: '/about' },
    { id: 3, title: 'Destinations', path: '/destinations' },
    { id: 4, title: 'Contact', path: '/contact' },
  ],
};

const destinations: FooterColumn = {
  id: 2,
  title: 'Popular Destinations',
  links: [
    { id: 1, title: 'Bali, Indonesia', path: '/destinations/bali' },
    { id: 2, title: 'Paris, France', path: '/destinations/paris' },
    { id: 3, title: 'Santorini, Greece', path: '/destinations/santorini' },
    { id: 4, title: 'Tokyo, Japan', path: '/destinations/tokyo' },
  ],
};

const support: FooterColumn = {
  id: 3,
  title: 'Support',
  links: [
    { id: 1, title: 'FAQ', path: '/faq' },
    { id: 2, title: 'Terms & Conditions', path: '/terms' },
    { id: 3, title: 'Privacy Policy', path: '/privacy' },
    { id: 4, title: 'Cookie Policy', path: '/cookies' },
  ],
};


const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer__container">
        <div className="footer__grid">
          <div className="footer__column">
            <div className="footer__logo">Wanderlust</div>
            <p className="footer__description">
              Discover the world with us. We provide unforgettable travel experiences to the most beautiful destinations around the globe.
            </p>
            <div className="footer__social">
              <a href="https://facebook.com" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer__column">
            <h3 className="footer__title">{quickLinks.title}</h3>
            <ul className="footer__list">
              {quickLinks.links.map((link) => (
                <li key={link.id} className="footer__item">
                  <a href={link.path} className="footer__link">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer__column">
            <h3 className="footer__title">{destinations.title}</h3>
            <ul className="footer__list">
              {destinations.links.map((link) => (
                <li key={link.id} className="footer__item">
                  <a href={link.path} className="footer__link">{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer__column">
            <h3 className="footer__title">{support.title}</h3>
            <ul className="footer__list">
              {support.links.map((link) => (
                <li key={link.id} className="footer__item">
                  <a href={link.path} className="footer__link">{link.title}</a>
                </li>
              ))}
            </ul>
            <div className="footer__form">
              <h4 className="footer__title">Subscribe</h4>
              <input type="email" placeholder="Your email" aria-label="Email for newsletter" />
              <Button variant="secondary" type="submit">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Wanderlust Travel. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
