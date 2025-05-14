import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from './AdminNavbar';

Chart.defaults.scale.category = true;

const HomePage = () => {
  const navigate = useNavigate();
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch doctor count
    fetch('https://backend-h6su.onrender.com/doctors/count')
      .then((response) => response.json())
      .then((data) => setDoctorCount(data))
      .catch((error) => console.error('Error fetching doctor count:', error));

    // Fetch appointment count
    fetch('https://backend-h6su.onrender.com/appointments/count')
      .then((response) => response.json())
      .then((data) => setAppointmentCount(data))
      .catch((error) => console.error('Error fetching appointment count:', error));

    // Fetch user count
    fetch('https://backend-h6su.onrender.com/login/count')
      .then((response) => response.json())
      .then((data) => setUserCount(data))
      .catch((error) => console.error('Error fetching user count:', error));
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/'); // Navigate to the home page after confirming logout
      }
    });
  };

  const randomData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
  const randomData2 = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));

  const barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Doctors',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.5)',
        hoverBorderColor: '#36A2EB',
        data: randomData,
      },
      {
        label: 'Patients',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
        hoverBorderColor: '#FF6384',
        data: randomData2,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.adminDashboard}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Admin Dashboard</h1>
          </div>
          <div style={styles.content}>
            <h2 style={styles.sectionTitle}>Statistics</h2>
            <div style={styles.statsContainer}>
              <div style={styles.statCard}>
                <h3 style={styles.statNumber}>{doctorCount}</h3>
                <p style={styles.statLabel}>Doctors</p>
              </div>
              <div style={styles.statCard}>
                <h3 style={styles.statNumber}>{appointmentCount}</h3>
                <p style={styles.statLabel}>Appointments</p>
              </div>
              <div style={styles.statCard}>
                <h3 style={styles.statNumber}>{userCount}</h3>
                <p style={styles.statLabel}>Users</p>
              </div>
            </div>
            <div style={styles.charts}>
              <div style={styles.chartContainer}>
                <Bar data={barChartData} options={options} />
              </div>
            </div>
            <h2 style={styles.sectionTitle}>Admin Tasks</h2>
            <div style={styles.tasks}>
              {[
                { date: '2022-01-01', task: 'Review reports', status: 'Completed' },
                { date: '2022-01-02', task: 'Update doctor schedules', status: 'Pending' },
                { date: '2022-01-03', task: 'Patient follow-ups', status: 'In Progress' },
              ].map((task, index) => (
                <div key={index} style={styles.taskCard}>
                  <h3 style={styles.taskDate}>{task.date}</h3>
                  <p style={styles.taskDetail}><strong>Task:</strong> {task.task}</p>
                  <p style={styles.taskDetail}><strong>Status:</strong> {task.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  adminDashboard: {
    display: 'flex',
    marginTop: '50px',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: '"Roboto", sans-serif',
    backgroundColor: '#ecf0f1',
  },
  mainContent: {
    flex: '1',
    padding: '20px',
    overflowY: 'auto',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '25px',
  },
  headerTitle: {
    margin: '0',
    fontSize: '32px',
    fontWeight: '500',
    color: '#34495e',
  },
  content: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: 'calc(100vh - 120px)',
    overflowY: 'auto',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: '500',
    color: '#34495e',
    marginBottom: '20px',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  statCard: {
    flex: '1',
    margin: '0 10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#34495e',
  },
  statLabel: {
    fontSize: '18px',
    color: '#7f8c8d',
  },
  charts: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  chartContainer: {
    flex: 1,
    margin: '0 10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  tasks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  taskCard: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  taskDate: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#34495e',
  },
  taskDetail: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginTop: '10px',
  },
};

export default HomePage;
