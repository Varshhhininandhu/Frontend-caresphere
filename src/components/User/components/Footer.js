import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            HEALTH PROS enhances patient care and streamlines medical services.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@healthpros.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} HEALTH PROS | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
