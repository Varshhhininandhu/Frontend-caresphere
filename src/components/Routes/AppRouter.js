import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Doctor pages
import DoctorHomePage from '../Doctor/Pages/Homepage1';
import Patients from '../Doctor/Pages/Patients';
import DoctorAppointments from '../Doctor/Pages/Appointments';
import ConHis from '../Doctor/Pages/ConHis';


// Admin pages
import AdminHomePage from '../Admin/Pages/HomePage';
import DoctorsPage from '../Admin/Pages/DoctorsPage';
import Users from '../Admin/Pages/Users';
import AddDoctor from '../Admin/Pages/AddDoctor';


//User pages
import About from '../User/components/About';
import UserDetails from '../User/UserDetails';
import EmergencyPage from '../User/components/Emer';
import Appoint from '../User/components/Appoint';
import Doctor from '../User/Doctor';
import Login from '../User/components/Loginandsignup/Login';
import ThankYou from '../User/ThankYouPage';
import Feedback from '../User/Feedback';
import Home from '../User/components/Home';
import Report from '../User/components/Report';
import MyAccount from '../User/components/MyAccount';

const AppRouter = ()=> {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/appointments" element={<Appoint />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/doctors" element={<Doctor/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/my-account" element={<MyAccount />} />


           
            <Route path="/doctor/home" element={<DoctorHomePage />} />
            <Route path="/doctor/pat" element={<Patients />} />
            <Route path="/doctor/app" element={<DoctorAppointments />} />
            <Route path="/doctor/his" element={<ConHis />} />
     

            <Route path="/admin/home" element={<AdminHomePage />} />
            <Route path="/admin/doc" element={<DoctorsPage />} />
            <Route path="/admin/add" element={<AddDoctor />} />
            <Route path="/admin/user" element={<Users />} />
        </Routes>
    )
}
export default AppRouter;