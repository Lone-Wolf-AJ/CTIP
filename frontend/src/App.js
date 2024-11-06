// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SuburbInsights from './pages/SuburbInsights';
import AboutUs from './pages/AboutUs';  // Import About Us page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suburb/:suburb" element={<SuburbInsights />} />
        <Route path="/about" element={<AboutUs />} />  {/* Add About Us route */}
      </Routes>
    </Router>
  );
}

export default App;
