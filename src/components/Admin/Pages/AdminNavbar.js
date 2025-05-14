import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username');
        localStorage.removeItem('role');

        navigate('/');
      }
    }).catch(err => {
      console.error('SweetAlert2 Error:', err);
    });
  };

  return (
    <div style={styles.topNav}>
      <div style={styles.logo}>
        <img src={logo} alt="Logo" style={styles.logoImage} />
        <h2 style={styles.logoText}>CARESPHERE</h2>
      </div>
      <div style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/admin/home" style={styles.navLink}>Dashboard</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/admin/doc" style={styles.navLink}>Doctor</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/admin/add" style={styles.navLink}>Add Doctor</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/admin/user" style={styles.navLink}>User</Link>
          </li>
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.navButton}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  topNav: {
    backgroundColor: '#003300', // Dark green
    color: '#ffffff',
    padding: '20px',
    borderBottom: '4px solid #004d00', // Slightly lighter green
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  logoImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50', // Light green
  },
  navbar: {
    marginTop: '10px',
    borderBottom: '2px solid #004d00', // Slightly lighter green
  },
  navList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center', // Align items in the center
    backgroundColor: '#006600', // Dark green
  },
  navItem: {
    marginBottom: '0',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '15px 20px', // Added more padding to space out links
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  navButton: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '15px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    textAlign: 'center',
  },
};

export default Navbar;
