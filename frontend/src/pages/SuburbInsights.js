import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
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
