import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuburbSearch.css';

const SuburbSearch = () => {
  const [suburb, setSuburb] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (suburb) {
      navigate(`/suburb/${suburb}`);
    }
  };

  return (
    <div className="suburb-search">
      <h2>Enter Suburb for Insights</h2>
      <input
        type="text"
        placeholder="Enter Suburb"
        value={suburb}
        onChange={(e) => setSuburb(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <p>Our advanced AI tools will help you explore tomorrow's real estate market today. With advanced machine learning
        technologies we will provide you insights about your prefered suburb. </p>
    </div>
  );
};

export default SuburbSearch;
