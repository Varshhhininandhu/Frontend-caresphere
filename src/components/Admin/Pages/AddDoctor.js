import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import Navbar from './AdminNavbar';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddDoctor = () => {
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    specialty: '',
    hospital: '',
    yearsOfExperience: '',
    description: '',
    imageUrl: '',
  });

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      try {
        const base64 = await base64Encode(file);
        setImagePreview(base64);
        setNewDoctor({ ...newDoctor, imageUrl: base64 });
      } catch (error) {
        console.error('Error converting to base64:', error);
        setMessage('Error converting image to base64.');
      }
    } else {
      setMessage('Invalid image format. Please upload a PNG image file.');
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }

      setMessage('Doctor added successfully.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setMessage('User created successfully.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.header}>Add Doctor</h1>
          <form>
            {/* Doctor Image */}
            <div style={styles.imageSection}>
              <label style={styles.label}>Doctor's Picture:</label>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Doctor Preview"
                  style={styles.imagePreview}
                />
              )}
            </div>
            {/* Doctor Details */}
            {['name', 'username', 'email', 'phone', 'specialty', 'hospital', 'yearsOfExperience'].map((field, index) => (
              <div style={styles.inputSection} key={index}>
                <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  type={field === 'yearsOfExperience' ? 'number' : 'text'}
                  name={field}
                  value={newDoctor[field]}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            <div style={styles.inputSection}>
              <label style={styles.label}>Description:</label>
              <textarea
                name="description"
                value={newDoctor.description}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Enter description"
              />
            </div>
            {/* Create Login Section */}
            <div style={styles.loginSection}>
              <h2>Create Login</h2>
              {['username', 'email', 'password', 'role'].map((field, index) => (
                <div style={styles.inputSection} key={index}>
                  <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={newUser[field]}
                    onChange={handleUserInputChange}
                    style={styles.input}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            {/* Submit Buttons */}
            <div style={styles.buttonContainer}>
              <button onClick={handleAddDoctor} style={styles.button}>
                Add Doctor
              </button>
              <button onClick={handleCreateUser} style={styles.button}>
                Create Login
              </button>
            </div>
          </form>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '0px',
    height: '100vh',
    padding: '10px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    animation: 'fadeIn 0.5s ease-in',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#003300',
    fontWeight: 'bold',
  },
  imageSection: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  fileInput: {
    marginBottom: '10px',
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '10px',
  },
  inputSection: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    marginBottom: '10px',
    transition: 'border-color 0.3s ease-in-out',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    marginBottom: '10px',
    transition: 'border-color 0.3s ease-in-out',
    resize: 'vertical',
  },
  loginSection: {
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#003300',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    color: 'green',
  },
};

export default AddDoctor;
