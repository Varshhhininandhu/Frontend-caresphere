import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import logo from '../addons/image.png'; // Import the logo image

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username from local storage on component mount
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/" className="app-name">CARESPHERE</Link>
        </div>
        <div className="menu-icon" onClick={handleDropdownToggle}>
          <i className="fas fa-bars"></i>
        </div>
        <div className={`nav-elements ${dropdownOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/doctors">Doctor</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/emergency">Emergency</Link></li>
            <li>
              {username ? (
                <Link to="/my-account" className="nav-item">{username}</Link>
              ) : (
                <Link to="/login" className="nav-item">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
