import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logo from '../addons/image.png';
import NavBar from './Navbar';

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const username = localStorage.getItem('username'); 
    
    if (username) {
      axios.get(`http://localhost:8080/userdetails/user?username=${username}`)
        .then(response => {
          setUserDetails(response.data[0]); 
          setFormData(response.data[0]);
        })
        .catch(err => {
          setError('Failed to fetch user details');
          console.error(err);
        });
    } else {
      setError('No username found in local storage');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios.put('http://localhost:8080/userdetails/update', formData)
      .then(response => {
        setUserDetails(response.data);
        setEditMode(false);
        Swal.fire('Success', 'User details updated successfully', 'success');
      })
      .catch(err => {
        setError('Failed to update user details');
        console.error(err);
      });
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(userDetails);
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
    <div>
        <NavBar />
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.headerContent}>
          <h1 style={styles.title}>My Account</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </div>
      {error && <p style={styles.errorText}>{error}</p>}
      {userDetails && (
        <div style={styles.content}>
          {editMode ? (
            <div>
              <h2 style={styles.sectionTitle}>Edit Your Details</h2>
              <form style={styles.form}>
                {Object.keys(userDetails).map(key => (
                  key !== 'id' && key !== 'username' && (
                    <div key={key} style={styles.formGroup}>
                      <label style={styles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                      <input
                        type="text"
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>
                  )
                ))}
                <div style={styles.buttonGroup}>
                  <button type="button" onClick={handleSave} style={styles.saveButton}>Save</button>
                  <button type="button" onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2 style={styles.sectionTitle}>Your Details</h2>
              <div style={styles.details}>
                {Object.keys(userDetails).map(key => (
                  key !== 'id' && key !== 'username' && (
                    <div key={key} style={styles.detailItem}>
                      <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {userDetails[key]}
                    </div>
                  )
                ))}
              </div>
              <button onClick={() => setEditMode(true)} style={styles.editButton}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '80px',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    justifyContent: 'space-between',
  },
  logo: {
    width: '50px',
    height: '50px',
    marginRight: '15px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    margin: '0',
    fontSize: '24px',
    color: '#333',
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '22px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  details: {
    marginBottom: '20px',
  },
  detailItem: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#555',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default MyAccount;
