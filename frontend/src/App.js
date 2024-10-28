import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Make sure this is the landing page
import SuburbInsights from './pages/SuburbInsights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/suburb/:suburb" element={<SuburbInsights />} /> {/* Suburb insights page */}
        {/* Add other routes here if necessary */}
      </Routes>
    </Router>
  );
}

export default App;
