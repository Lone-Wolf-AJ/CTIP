import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PredictionForm from '../components/PredictionForm';
import SuburbHeatmap from '../components/SuburbHeatmap';
import AttributeEffectBarChart from '../components/AttributeEffectBarChart';
import PriceDistributionChart from '../components/PriceDistributionChart'; // Import the new chart component
import { useParams } from 'react-router-dom';
import './SuburbInsights.css';

const SuburbInsights = () => { 
  const { suburb } = useParams();
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [priceData, setPriceData] = useState([]); // Initialize priceData state

  const handlePrediction = (price) => {
    setPredictedPrice(price);
  };

  // Fetch price distribution data for the specific suburb
  useEffect(() => {
    axios
      .get(`http://localhost:8000/price-distribution`, { params: { suburb } })
      .then((response) => {
        setPriceData(response.data); // Set fetched data to priceData
      })
      .catch((error) => {
        console.error("Error fetching price distribution data:", error);
      });
  }, [suburb]);

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
          <SuburbHeatmap suburb={suburb} />
        </div>
      </div>

      <AttributeEffectBarChart suburb={suburb} />

      {/* Render the price distribution chart */}
      <div className="price-distribution-chart">
        <h2>Price Distribution by Property Type and Room/Toilet Count</h2>
        <PriceDistributionChart data={priceData} />
      </div>

      <Footer />
    </div>
  );
};

export default SuburbInsights;
