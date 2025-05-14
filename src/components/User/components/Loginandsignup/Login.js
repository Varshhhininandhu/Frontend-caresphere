import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';
import NavBar from '../Navbar';

const Login = () => {
  const [activeTab, setActiveTab] = useState('sign-in');
  const [signInData, setSignInData] = useState({ username: '', password: '', role: 'user' });
  const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    const storedUser = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedUser && storedRole) {
      switch (storedRole) {
        case 'admin':
          navigate('/admin/home');
          break;
        case 'doctor':
          navigate('/doctor/home');
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [navigate]);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('username', signInData.username);
        localStorage.setItem('role', result.role);
        Swal.fire({ icon: 'success', title: 'Login Successful', text: 'You are being redirected.' })
          .then((res) => {
            if (res.isConfirmed) {
              switch (result.role) {
                case 'admin':
                  navigate('/admin/home');
                  break;
                case 'doctor':
                  navigate('/doctor/home');
                  break;
                default:
                  navigate('/');
                  break;
              }
            }
          });
      } else {
        Swal.fire({ icon: 'error', title: 'Login Failed', text: result.message || 'Login failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'An error occurred during login' });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signUpData, role: 'user' }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('username', signUpData.username);
        Swal.fire({ icon: 'success', title: 'Registration Successful', text: 'You have successfully registered.' })
          .then((res) => {
            if (res.isConfirmed) {
              navigate('/userdetails');
            }
          });
      } else {
        Swal.fire({ icon: 'error', title: 'Registration Failed', text: result.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'An error occurred during registration' });
    }
  };

  return (
    <div>
      <NavBar />
    <div className="login-body">
      <div className="login-container">
        <div className="login-header">
          <button className={`login-tab-button ${activeTab === 'sign-in' ? 'login-active' : ''}`} onClick={() => setActiveTab('sign-in')}>
            Sign In
          </button>
          <button className={`login-tab-button ${activeTab === 'sign-up' ? 'login-active' : ''}`} onClick={() => setActiveTab('sign-up')}>
            Sign Up
          </button>
        </div>
        <form className={`login-form ${activeTab === 'sign-in' ? 'sign-in-form' : 'sign-up-form'}`} onSubmit={activeTab === 'sign-in' ? handleSignInSubmit : handleSignUpSubmit}>
          {activeTab === 'sign-in' ? (
            <>
              <div className="login-group">
                <label className="login-label">Username:</label>
                <input type="text" name="username" value={signInData.username} onChange={handleSignInChange} className="login-input" required />
              </div>
              <div className="login-group">
                <label className="login-label">Password:</label>
                <input type={passwordVisible ? 'text' : 'password'} name="password" value={signInData.password} onChange={handleSignInChange} className="login-input" required />
                <button type="button" className="login-password-toggle" onClick={togglePasswordVisibility}>
                  {passwordVisible ? 'Hide' : 'Show'} Password
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="login-group">
                <label className="login-label">Username:</label>
                <input type="text" name="username" value={signUpData.username} onChange={handleSignUpChange} className="login-input" required />
              </div>
              <div className="login-group">
                <label className="login-label">Email:</label>
                <input type="email" name="email" value={signUpData.email} onChange={handleSignUpChange} className="login-input" required />
              </div>
              <div className="login-group">
                <label className="login-label">Password:</label>
                <input type={passwordVisible ? 'text' : 'password'} name="password" value={signUpData.password} onChange={handleSignUpChange} className="login-input" required />
                <button type="button" className="login-password-toggle" onClick={togglePasswordVisibility}>
                  {passwordVisible ? 'Hide' : 'Show'} Password
                </button>
              </div>
            </>
          )}
          <button type="submit" className="login-button">{activeTab === 'sign-in' ? 'Sign In' : 'Sign Up'}</button>
          <hr className="login-hr" />
          <div className="login-foot-lnk">
            <a href="#" onClick={() => setActiveTab(activeTab === 'sign-in' ? 'sign-up' : 'sign-in')}>
              {activeTab === 'sign-in' ? 'Create an account' : 'Already have an account? Sign In'}
            </a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
