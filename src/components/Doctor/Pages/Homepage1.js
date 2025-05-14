import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const HomePage = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [attendedPatients, setAttendedPatients] = useState(0);
  const [unattendedPatients, setUnattendedPatients] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  const navigate = useNavigate();
  const doctorUsername = localStorage.getItem('username'); // Retrieve the doctor's username from localStorage

  useEffect(() => {
    // Fetch the total number of patients for the doctor
    fetch(`http://localhost:8080/doctor/patients/count?doctor=${doctorUsername}`)
      .then((response) => response.json())
      .then((data) => setTotalPatients(data))
      .catch((error) => console.error('Error fetching total patients:', error));

    // Fetch the count of ongoing patients
    fetch(`http://localhost:8080/doctor/ongoing?doctor=${doctorUsername}`)
      .then((response) => response.json())
      .then((data) => setUnattendedPatients(data.length))
      .catch((error) => console.error('Error fetching ongoing patients:', error));

    // Fetch the count of completed patients
    fetch(`http://localhost:8080/doctor/completed?doctor=${doctorUsername}`)
      .then((response) => response.json())
      .then((data) => setAttendedPatients(data.length))
      .catch((error) => console.error('Error fetching completed patients:', error));

    // Fetch the total number of appointments for the doctor
    fetch(`http://localhost:8080/appointments/countByDoctor?doctorusername=${doctorUsername}`)
      .then((response) => response.json())
      .then((data) => setAppointmentsCount(data))
      .catch((error) => console.error('Error fetching appointments count:', error));
  }, [doctorUsername]);

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

  // Doughnut chart data
  const doughnutChartData = {
    labels: ['Total Patients', 'Attended Patients', 'Ongoing Patients', 'Total Appointments'],
    datasets: [
      {
        label: 'Count',
        data: [totalPatients, attendedPatients, unattendedPatients, appointmentsCount],
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12'],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
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
        <h2 style={styles.title}>Patients Overview</h2>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <h3 style={styles.statTitle}>Total Patients</h3>
            <div style={styles.statValue}>{totalPatients}</div>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statTitle}>Attended Patients</h3>
            <div style={styles.statValue}>{attendedPatients}</div>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statTitle}>Ongoing Patients</h3>
            <div style={styles.statValue}>{unattendedPatients}</div>
          </div>
        </div>

        <h2 style={styles.title}>Statistics Overview</h2>
        <div style={styles.doughnutContainer}>
          <Doughnut data={doughnutChartData} options={doughnutOptions} />
        </div>
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
    listStyle: 'none',
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
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '40px',
  },
  statItem: {
    textAlign: 'center',
  },
  statTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#34495e',
  },
  statValue: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#3498db',
  },
  doughnutContainer: {
    width: '50%',
    height: '300px',
    marginTop:'50px',
    marginRight:'-500px'
  },
};

export default HomePage;
