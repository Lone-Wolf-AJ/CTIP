import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PredictionForm from '../components/PredictionForm';
import SuburbHeatmap from '../components/SuburbHeatmap'; // New heatmap component for suburb datad
import { useParams } from 'react-router-dom';
import './SuburbInsights.css';



const SuburbInsights = () => { 
  const { suburb } = useParams();


  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePrediction = (price) => {
    setPredictedPrice(price);
  };

  return (
    
    <div className="suburb-insights">
      <Navbar />
      <div className="input-and-map-container">
        <div className="prediction-form-container">
          <h2>Predict Property Price</h2>
          <p>Enter the property details to get an estimated price in {suburb}.</p>
          <PredictionForm onPrediction={handlePrediction} />
          {predictedPrice && (
            <div className="prediction-result">
              <h3>Estimated Price:</h3>
              <p>${predictedPrice.toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="suburb-heatmap-container">
          <h2>{suburb} Property Price Heatmap</h2>
          <SuburbHeatmap suburb={suburb} /> {/* Pass suburb as prop */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuburbInsights;
