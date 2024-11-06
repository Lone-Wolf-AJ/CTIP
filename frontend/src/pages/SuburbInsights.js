import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios'; // Import axios
import Footer from '../components/Footer/Footer';
import PredictionForm from '../components/PredictionForm';
import SuburbHeatmap from '../components/SuburbHeatmap';
import AttributeEffectBarChart from '../components/AttributeEffectBarChart';
import PriceDistributionChart from '../components/PriceDistributionChart';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './SuburbInsights.css';

const SuburbInsights = () => { 
  const { suburb } = useParams();
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [priceData, setPriceData] = useState([]);

  const handlePrediction = (price) => {
    setPredictedPrice(price);
  };

  useEffect(() => {
    // Fetch price distribution data for the specific suburb
    axios
      .get(`http://localhost:8000/price-distribution`, { params: { suburb } })
      .then((response) => {
        setPriceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching price distribution data:", error);
      });
  }, [suburb]);

  // Export the page content as PDF
  const exportPDF = () => {
    const input = document.getElementById('suburb-insights-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;  // Leave some padding
      const imgHeight = canvas.height * (imgWidth / canvas.width);

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${suburb}_insights.pdf`);
    });
  };

  return (
    <div className="suburb-insights" id="suburb-insights-content">
      <Navbar />
      <div className="input-and-map-container">
        <div className="prediction-form-container">
          <h2>Predict Property Price</h2>
          <p>Enter the property details to get an estimated price in {suburb}.</p>
          <PredictionForm onPrediction={handlePrediction} />
          {predictedPrice && (
            <div className="prediction-result">
              <h3>Estimated Price:</h3>
              <p>${Math.round(predictedPrice).toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="suburb-heatmap-container">
          <h2>{suburb} Property Price Heatmap</h2>
          <SuburbHeatmap suburb={suburb} />
        </div>
      </div>

      <AttributeEffectBarChart suburb={suburb} />

      <div className="price-distribution-chart">
        <h2>Price Distribution by Property Type and Room/Toilet Count</h2>
        
        <PriceDistributionChart data={priceData} />
      </div>

      {/* Export to PDF Button */}
      <div className="export-pdf-button">
        <button onClick={exportPDF}>Export Insights as PDF</button>
      </div>

      <Footer />
    </div>
  );
};

export default SuburbInsights;
