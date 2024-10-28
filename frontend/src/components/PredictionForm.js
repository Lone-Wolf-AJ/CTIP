import React, { useState } from 'react';
import { getPredictedPrice } from '../services/api';
import './PredictionForm.css';  // Import your CSS

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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const prediction = await getPredictedPrice(formData);  // Calls the POST request
      setPredictedPrice(prediction.predicted_price);
      setError(null);
    } catch (err) {
      setError("There was an issue fetching the prediction.");
      setPredictedPrice(null);
    }
  };
  
  return (
    <div className="prediction-form">
      <h2>Predict Property Price</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rooms:
          <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} required />
        </label>
        <label>
          Building Area:
          <input type="number" name="building_area" value={formData.building_area} onChange={handleChange} required />
        </label>
        <label>
          Landsize:
          <input type="number" name="landsize" value={formData.landsize} onChange={handleChange} required />
        </label>
        <label>
          Distance from CBD:
          <input type="number" name="distance" value={formData.distance} onChange={handleChange} required />
        </label>
        <button type="submit">Get Prediction</button>
      </form>

      {predictedPrice !== null && (
        <div>
          <h3>Predicted Price: ${predictedPrice}</h3>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default PredictionForm;
