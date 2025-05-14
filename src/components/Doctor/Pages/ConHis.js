import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';

const ConHis = () => {
  const [consultations, setConsultations] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (username) {
      fetch(`http://localhost:8080/doctor/completed?doctor=${username}`)
        .then((response) => response.json())
        .then((data) => setConsultations(data))
        .catch((error) => console.error('Error fetching consultations:', error));
    }
  }, []);

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetails(true);
  };

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
    <div style={styles.container}>
      <div style={styles.topNav}>
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
          <h2 style={styles.logoText}>CARESPHERE</h2>
        </div>
        <div style={styles.navbar}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/doctor/home" style={styles.navLink}>DASHBOARD</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/doctor/pat" style={styles.navLink}>PATIENTS</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/doctor/app" style={styles.navLink}>APPOINTMENTS</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/doctor/his" style={styles.navLink}>CONSULTATION HISTORY</Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.navButton}>LOGOUT</button>
            </li>
          </ul>
        </div>
      </div>
      <div style={styles.content}>
        <h1 style={styles.headerTitle}>Consultation History</h1>
        <hr style={styles.separator} />
        <div style={styles.consultationList}>
          {consultations.map((consultation) => (
            <div style={styles.consultationCard} key={consultation.id}>
              <div style={styles.cardHeader}>
                <h3 style={styles.consultationDoctor}>{consultation.name}</h3>
                <p style={styles.consultationTime}>{consultation.date}</p>
              </div>
              <div style={styles.consultationInfo}>
                <p><strong>Patient:</strong> {consultation.name}</p>
                <p><strong>Email:</strong> {consultation.email}</p>
                <p><strong>Illness:</strong> {consultation.illness}</p>
                <button style={styles.viewDetailsButton} onClick={() => handleViewDetails(consultation)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {showDetails && (
          <div style={styles.consultationDetails}>
            <h2 style={styles.detailsTitle}>Consultation Details</h2>
            <p style={styles.detailsInfo}>
              <strong>Doctor:</strong> {selectedConsultation.doctor}
            </p>
            <p style={styles.detailsInfo}>
              <strong>Patient Name:</strong> {selectedConsultation.name}
            </p>
            <p style={styles.detailsInfo}>
              <strong>Email:</strong> {selectedConsultation.email}
            </p>
            <p style={styles.detailsInfo}>
              <strong>Illness:</strong> {selectedConsultation.illness}
            </p>
            <p style={styles.detailsInfo}>
              <strong>Treatment:</strong> {selectedConsultation.treatment}
            </p>
            <button style={styles.closeButton} onClick={() => setShowDetails(false)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
  },
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
    alignItems: 'center',
    backgroundColor: '#006600', // Darker green for navbar
  },
  navItem: {
    marginBottom: '0',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '15px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '15px 20px',
    fontSize: '16px',
  },
  content: {
    flex: '1',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  separator: {
    width: '100%',
    margin: '20px 0',
    borderTop: '2px solid #ddd',
  },
  consultationList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  consultationCard: {
    width: '320px',
    margin: '15px',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  consultationDoctor: {
    fontSize: '20px',
    color: '#34495e',
  },
  consultationTime: {
    fontSize: '16px',
    color: '#7f8c8d',
  },
  consultationInfo: {
    marginTop: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  viewDetailsButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  consultationDetails: {
    width: '100%',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  detailsTitle: {
    fontSize: '24px',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  detailsInfo: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '12px',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default ConHis;
