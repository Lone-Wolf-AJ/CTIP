// AttributeEffectBarChart.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const AttributeEffectBarChart = ({ suburb }) => {
  const [effectData, setEffectData] = useState({});

  useEffect(() => {
    if (suburb) {
      axios.get(`http://127.0.0.1:8000/attribute-effect`, { params: { suburb } })
        .then(response => {
          setEffectData(response.data);
        })
        .catch(error => {
          console.error("Error fetching attribute effect data:", error);
        });
    }
  }, [suburb]);

  const attributes = Object.keys(effectData);
  const effects = Object.values(effectData);

  return (
    <div>
      <h3>Effect of Attributes on Price in {suburb}</h3>
      <Plot
        data={[
          {
            x: attributes,
            y: effects,
            type: 'bar',
            marker: { color: 'teal' }
          }
        ]}
        layout={{
          title: `Attribute Effect on Price in ${suburb}`,
          xaxis: { title: 'Attributes' },
          yaxis: { title: 'Correlation with Price' },
          margin: { l: 50, r: 50, b: 100, t: 50 }
        }}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
};

export default AttributeEffectBarChart;
