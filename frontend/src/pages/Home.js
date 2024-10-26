import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SuburbSearch from '../components/SuburbSearch';
import Heatmap from '../components/Heatmap';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="main-content">
        <SuburbSearch />
        <Heatmap />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
