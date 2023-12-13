import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigateTo = useNavigate();

  const handleLinkClick = (sectionId) => {
    navigateTo('/landingPage');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="footer p-10 bg-secondary text-base-content">
      <aside>
        <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current">
          {/* SVG Path */}
        </svg>
        <p>Your wedding planner<br/>Copyright © 2023 - All rights reserved</p>
      </aside> 
      <div>
        <header className="footer-title">Services</header> 
        <button onClick={() => handleLinkClick('weddingOrganization')} className="link link-hover">Wedding Organization</button>
      </div> 
      <div>
        <header className="footer-title">Company</header> 
        <button onClick={() => handleLinkClick('aboutUs')} className="link link-hover">About us</button>
        <button onClick={() => handleLinkClick('contact')} className="link link-hover">Contact</button>
      </div> 
    </footer>
  );
}

export default Footer;
