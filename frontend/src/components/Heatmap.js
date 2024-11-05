import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getHeatmapData } from '../services/api';
import { scaleLinear } from 'd3-scale';

const Heatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHeatmapData();
        setData(result);
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      }
    };
    fetchData();
  }, []);

  // Calculate min and max prices for the color scale
  const prices = data.map((item) => item.median_price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Create a color scale from green (low price) to red (high price)
  const colorScale = scaleLinear()
    .domain([minPrice, maxPrice])  // Set the price range
    .range(["#90ee90", "#ff4500"]); // Light green to red

  return (
    <div className="map-container">
    <MapContainer center={[-37.8136, 144.9631]} zoom={11} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((item, index) => (
        <CircleMarker
          key={index}
          center={[item.Lattitude, item.Longtitude]}
          radius={8}  // Adjust based on median_price if needed
          color={colorScale(item.median_price)}  // Set color based on price
          fillColor={colorScale(item.median_price)}  // Fill color
          fillOpacity={0.7}
        >
          <Popup>
            <div>
              <strong>Suburb:</strong> {item.Suburb} <br />
              <strong>Median Price:</strong> ${item.median_price.toLocaleString()}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
    </div>
  );
};

export default Heatmap;
