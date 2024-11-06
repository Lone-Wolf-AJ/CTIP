// AboutUs.js
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>About Us</h1>
        <p>Welcome to Real Estate IQ! We aim to provide insights and predictions for the real estate market.</p>
        <p>Our platform leverages AI to give you accurate property price predictions, heatmaps, and other market insights.</p>
        <p>Whether you are a buyer, seller, or investor, we hope to help you make informed real estate decisions.</p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
