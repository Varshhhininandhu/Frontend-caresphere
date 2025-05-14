import React, { useEffect, useState } from 'react';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import Navbar from './AdminNavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://backend-h6su.onrender.com/login'); // Adjust the URL if needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <Navbar />
    <div style={styles.adminDashboard}>
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Users</h1>
        </div>
        <div style={styles.content}>
          <div style={styles.searchArea}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.userListSearch}
              onChange={handleSearch}
              value={search}
            />
          </div>
          <ul style={styles.userList}>
            {users
              .filter((user) => {
                return (
                  user.username.toLowerCase().includes(search.toLowerCase()) ||
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  user.email.toLowerCase().includes(search.toLowerCase()) ||
                  user.location.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((user, index) => {
                return (
                  <li key={index} style={styles.userCard}>
                    <h3 style={styles.username}>{user.username}</h3>
                    <p style={styles.fullname}>{user.name}</p>
                    <a href={`mailto:${user.email}`} style={styles.email}>{user.email}</a>
                    <p style={styles.location}>{user.location}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  adminDashboard: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f4f6f8',
  },
  mainContent: {
    flex: '1',
    padding: '20px',
    overflowY: 'auto',
  },
  header: {
    backgroundColor: '#003300',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '25px',
    textAlign: 'center', // Center-align the header content
  },
  headerTitle: {
    margin: '0',
    fontSize: '28px',
    color: 'white',
  },
  content: {
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height: 'calc(100vh - 115px)',
    overflowY: 'auto',
  },
  searchArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  userListSearch: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease',
  },
  userListSearchFocus: {
    borderColor: '#3498db',
  },
  userList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  userCard: {
    margin: '15px',
    padding: '20px',
    border: 'none', // Remove default border
    borderRadius: '15px', // Rounded corners
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // More pronounced shadow
    width: '250px',
    backgroundColor: '#ffffff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userCardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#f9f9f9', // Slightly different background on hover
  },
  username: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#2c3e50',
    marginBottom: '10px',
    textAlign: 'center',
  },
  fullname: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#7f8c8d',
    textAlign: 'center',
  },
  email: {
    textDecoration: 'none',
    color: '#3498db',
    fontSize: '16px',
    textAlign: 'center',
  },
  emailHover: {
    textDecoration: 'underline',
  },
  location: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#95a5a6',
    textAlign: 'center',
  },
};

export default Users;
