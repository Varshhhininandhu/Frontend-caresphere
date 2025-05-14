import React from "react";
import Quote from "./Quote";
import Features from "./Features";
import Footer from "./Footer";
import AboutUs from "./Aboutus";
import NavBar from "./Navbar";


const Home = ()=>{
    return(
        <div>
            <NavBar />
            <Quote/>
            <AboutUs/>
            <Features/>
            <Footer/>
        </div>
    );
}

export default Home;