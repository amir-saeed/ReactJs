import React, { useEffect, useState } from 'react';
import Container from '../shared/Container';
import Navigation from './Navigation';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Container className="header__container">
        <a href="/" className="header__logo">
          Wanderlust
        </a>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;