import React, { useState } from 'react';
import { getPredictedPrice } from '../services/api';
import './PredictionForm.css';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    rooms: '',
    building_area: '',
    landsize: '',
    distance: ''
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+$/.test(value)) {  // Allow only digits or empty input
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const prediction = await getPredictedPrice(formData);  // Calls the POST request
      setPredictedPrice(Math.round(prediction.predicted_price));  // Round to nearest whole number
      setError(null);
    } catch (err) {
      setError("There was an issue fetching the prediction.");
      setPredictedPrice(null);
    }
  };
  
  return (
    <div className="prediction-form">
      <form onSubmit={handleSubmit}>
        <label>
          Rooms (count):
          <input 
            type="number" 
            name="rooms" 
            value={formData.rooms} 
            onChange={handleChange} 
            required 
            placeholder="e.g., 3"
          />
        </label>
        <label>
          Building Area (sqm):
          <input 
            type="number" 
            name="building_area" 
            value={formData.building_area} 
            onChange={handleChange} 
            required 
            placeholder="e.g., 150"
          />
        </label>
        <label>
          Landsize (sqm):
          <input 
            type="number" 
            name="landsize" 
            value={formData.landsize} 
            onChange={handleChange} 
            required 
            placeholder="e.g., 500"
          />
        </label>
        <label>
          Distance from CBD (KM):
          <input 
            type="number" 
            name="distance" 
            value={formData.distance} 
            onChange={handleChange} 
            required 
            placeholder="e.g., 10"
          />
        </label>
        <button type="submit">Get Prediction</button>
      </form>

      {predictedPrice !== null && (
        <div>
          <h3>Predicted Price: ${predictedPrice.toLocaleString()}</h3>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default PredictionForm;
