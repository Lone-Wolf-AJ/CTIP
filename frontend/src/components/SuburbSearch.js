import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuburbSearch.css';

const SuburbSearch = () => {
  const [suburb, setSuburb] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedSuburb = suburb.trim();
    if (trimmedSuburb) {
      setError(null);
      navigate(`/suburb/${trimmedSuburb}`);
    } else {
      setError("Please enter a valid suburb name.");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {  // Allow only letters and spaces
      setSuburb(value);
      setError(null);  // Clear error when input is valid
    } else {
      setError("Only letters are allowed in the suburb name.");
    }
  };

  return (
    <div className="suburb-search">
      <h2>Enter Suburb for Insights</h2>
      <input
        type="text"
        placeholder="Enter Suburb"
        value={suburb}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      <p>Our advanced AI tools will help you explore tomorrow's real estate market today. With advanced machine learning
        technologies we will provide you insights about your preferred suburb.</p>
    </div>
  );
};

export default SuburbSearch;
