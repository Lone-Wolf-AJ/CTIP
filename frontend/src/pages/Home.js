import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SuburbSearch from '../components/SuburbSearch';
import Heatmap from '../components/Heatmap';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="main-content">
        <div className="left-section">
          <h2 className="map-heading">Melbourne Property Price Heatmap</h2>
          <p className="map-instructions">
            Use the heatmap to explore property price trends across different suburbs in Melbourne. 
            The color of each circle represents the median property price, it ranges form red to green representing most expesive to the least expensive. Click on a circle to view the suburb name and median price.
          </p>
          <Heatmap />
        </div>
        <div className="right-section">
          <SuburbSearch />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
