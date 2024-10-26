import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PredictionForm from '../components/PredictionForm';
import { useParams } from 'react-router-dom';

const SuburbInsights = () => {
  const { suburb } = useParams();

  return (
    <div className="suburb-insights">
      <Navbar />
      <h2>Property Insights for {suburb}</h2>
      <PredictionForm suburb={suburb} />
      <Footer />
    </div>
  );
};

export default SuburbInsights;
