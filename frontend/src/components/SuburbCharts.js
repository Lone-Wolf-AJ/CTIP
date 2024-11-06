// SuburbCharts.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const SuburbCharts = ({ suburb }) => {
  const [suburbData, setSuburbData] = useState([]);

  useEffect(() => {
    // Fetch the suburb data from the backend
    axios.get("http://127.0.0.1:8000/suburb-heatmap", { params: { suburb } })
      .then(response => {
        setSuburbData(response.data);
      })
      .catch(error => {
        console.error("Error fetching suburb data:", error);
      });
  }, [suburb]);

  // Prepare data for the Price vs Attributes graph
  const attributes = ["Rooms", "BuildingArea", "Landsize", "Distance"];
  const priceVsAttributesData = attributes.map(attribute => ({
    x: suburbData.map(property => property[attribute]),
    y: suburbData.map(property => property.Price),
    mode: 'markers',
    name: attribute
  }));

  // Data for the box plot (Price distribution by Room count)
  const boxPlotData = {
    x: suburbData.map(property => property.Rooms),
    y: suburbData.map(property => property.Price),
    type: 'box',
    name: 'Price Distribution by Room Count',
    marker: { color: 'blue' }
  };

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <h2>{suburb} Real Estate Insights</h2>
      
      {/* Price vs Attributes Scatter Plot */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Price vs Attributes</h3>
        <Plot
          data={priceVsAttributesData}
          layout={{
            title: `Price vs Various Attributes in ${suburb}`,
            xaxis: { title: 'Attribute Value' },
            yaxis: { title: 'Price' },
            showlegend: true,
            responsive: true
          }}
          style={{ width: "100%", height: "400px" }}
        />
      </div>

      {/* Box Plot for Price Distribution by Room Count */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Price Distribution by Room Count</h3>
        <Plot
          data={[boxPlotData]}
          layout={{
            title: `Price Distribution by Room Count in ${suburb}`,
            xaxis: { title: 'Number of Rooms' },
            yaxis: { title: 'Price' },
            responsive: true,
            boxmode: 'group',
          }}
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </div>
  );
};

export default SuburbCharts;
