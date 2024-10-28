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
    </div>
  );
};

export default SuburbSearch;
