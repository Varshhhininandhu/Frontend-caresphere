import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import "./style.css";
import Footer from "./components/Footer";

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentReason, setAppointmentReason] = useState("");
  const [patientName, setPatientName] = useState(""); // New state for patient name

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://backend-h6su.onrender.com/doctors/all");
        setDoctors(response.data);
      } catch (error) {
        setError("Failed to fetch doctors.");
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleConfirmAppointment = async () => {
    if (!appointmentDate || !appointmentTime || !appointmentReason || !patientName) {
      alert("Please fill out all fields.");
      return;
    }

    const username = localStorage.getItem("username");

    if (!username) {
      alert("User not logged in.");
      return;
    }

    try {
      const appointmentDetails = {
        doctorname: selectedDoctor.name,
        doctorEmail: selectedDoctor.email,
        doctorPhone: selectedDoctor.phone,
        doctorSpecialty: selectedDoctor.specialty,
        doctorHospital: selectedDoctor.hospital,
        doctorusername: selectedDoctor.username,
        appointmentDate,
        appointmentTime,
        username,
        status: 'pending',
        doctorImageUrl: selectedDoctor.imageUrl,
      };

      const appointmentResponse = await axios.post("https://backend-h6su.onrender.com/appointments/create", appointmentDetails);
      const appointmentId = appointmentResponse.data.id;

      const patientDetails = {
        name: patientName, // Include patient name here
        patientusername: username,
        email: selectedDoctor.email,
        phone: selectedDoctor.phone,
        illness: appointmentReason,
        doctor: selectedDoctor.name,
        status: "ongoing",
        treatment: "",
        appointmentid: appointmentId,
      };

      await axios.post("https://backend-h6su.onrender.com/doctor/create", patientDetails);

      navigate("/thankyou", {
        state: {
          doctorName: selectedDoctor.name,
          appointmentDate,
          appointmentTime,
          reason: appointmentReason,
        },
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment.");
    }

    setSelectedDoctor(null);
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentReason("");
    setPatientName(""); // Clear the patient name field
  };

  const handleCancelAppointment = () => {
    setSelectedDoctor(null);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const title = doctor.name?.toLowerCase() || "";
    const description = doctor.description?.toLowerCase() || "";
    const searchTermLower = searchTerm.toLowerCase();
    return title.includes(searchTermLower) || description.includes(searchTermLower);
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "30%",
            padding: "15px",
            fontSize: "16px",
            marginTop: "90px",
            marginBottom: "30px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        />
        <main className="doctor-container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              img={doctor.imageUrl} // Pass imageUrl to the Card component
              title={doctor.name}
              description={doctor.description}
              specialty={doctor.specialty}
              hospital={doctor.hospital}
              yearsOfExperience={doctor.yearsOfExperience}
            >
              <div className="button-container" style={buttonContainerStyle}>
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  style={{
                    backgroundColor: "#003135",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "12px 24px",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#003135";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#003135";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </Card>
          ))}
        </main>

        {selectedDoctor && (
          <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', width: '400px', boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
              <h2 style={{ marginTop: 0, marginBottom: '15px', fontSize: '20px' }}>Book Appointment with {selectedDoctor.name}</h2>
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter your name"
                style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <label htmlFor="time">Select Time:</label>
              <input
                type="time"
                id="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <label htmlFor="reason">Reason for Appointment:</label>
              <textarea
                id="reason"
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
                placeholder="Enter the reason for your appointment"
                style={{ display: 'block', margin: '10px 0', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px' }}
              />
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={handleConfirmAppointment} style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Confirm</button>
                <button onClick={handleCancelAppointment} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Doctor;

const buttonContainerStyle = {
  marginTop: '15px', // Add some space above the button
  textAlign: 'center', // Center align the button within the container
};
