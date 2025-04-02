


import React, { useState, useEffect } from 'react';
import { NavItem } from '../../types';

const navItems: NavItem[] = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Destinations', path: '/destinations' },
  { id: 3, title: 'About Us', path: '/about' },
  { id: 4, title: 'Blog', path: '/blog' },
  { id: 5, title: 'Contact', path: '/contact' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(1);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navList = document.querySelector('.nav__list');
      const navToggle = document.querySelector('.nav__toggle');
      
      if (
        navList &&
        navToggle &&
        !navList.contains(event.target as Node) &&
        !navToggle.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Disable scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavClick = (id: number) => {
    setActiveId(id);
    setIsOpen(false);
  };
  
  return (
    <nav className="nav">
      <div 
        className={`nav__toggle ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <span className="nav__toggle-bar"></span>
        <span className="nav__toggle-bar"></span>
        <span className="nav__toggle-bar"></span>
      </div>
      
      <div 
        className={`nav__overlay ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>
      
      <ul className={`nav__list ${isOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <li key={item.id} className="nav__item">
            <a
              href={item.path}
              className={`nav__link ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;