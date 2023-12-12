import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
        <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current">
          {/* SVG Path */}
        </svg>
        <p>Your wedding planner<br/>Copyright © 2023 - All rights reserved</p>
      </aside> 
      <div>
        <header className="footer-title">Services</header> 
        <Link to="/WeddingOrganization" className="link link-hover">Wedding Organization</Link>
      </div> 
      <div>
        <header className="footer-title">Company</header> 
        <Link to="/AboutUs" className="link link-hover">About us</Link>
        <Link to="/Contact" className="link link-hover">Contact</Link>
      </div> 
    </footer>
  );
}

export default Footer;
