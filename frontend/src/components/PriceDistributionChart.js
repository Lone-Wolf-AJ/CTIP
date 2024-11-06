import React from 'react';
import Plot from 'react-plotly.js';

const PriceDistributionChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for this chart.</p>;
  }

  const roomCounts = data.map(item => item.Rooms);
  const bathroomCounts = data.map(item => item.Bathroom);
  const propertyTypes = data.map(item => item.Type);
  const prices = data.map(item => item.Price);

  return (
    <Plot
      data={[
        {
          x: roomCounts,
          y: bathroomCounts,
          text: propertyTypes.map((type, index) =>
            `${type.toUpperCase()}: $${prices[index].toLocaleString()}`
          ),
          hoverinfo: 'text',
          mode: 'markers',
          marker: {
            size: 12,
            color: prices,
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
              title: 'Price',
              titleside: 'right'
            }
          }
        }
      ]}
      layout={{
        title: 'Price Distribution by Property Type and Room/Toilet Count',
        xaxis: { title: 'Rooms' },
        yaxis: { title: 'Bathrooms' },
        showlegend: false
      }}
    />
  );
};

export default PriceDistributionChart;
