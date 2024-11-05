import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import axios from 'axios';

const SuburbHeatmap = ({ suburb }) => {
  const [suburbData, setSuburbData] = useState([]);
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]); // Default to Melbourne

  useEffect(() => {
    if (suburb) {
      axios.get("http://127.0.0.1:8000/suburb-heatmap", { params: { suburb } })
        .then(response => {
          const data = response.data;
          setSuburbData(data);

          // Calculate the center of all properties in the suburb
          if (data.length > 0) {
            const avgLatitude = data.reduce((sum, property) => sum + property.Lattitude, 0) / data.length;
            const avgLongitude = data.reduce((sum, property) => sum + property.Longtitude, 0) / data.length;
            setMapCenter([avgLatitude, avgLongitude]);
          }
        })
        .catch(error => {
          console.error("Error fetching suburb data:", error);
        });
    }
  }, [suburb]);

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RecenterMap center={mapCenter} />
      {suburbData.map((property, index) => (
        <CircleMarker
          key={index}
          center={[property.Lattitude, property.Longtitude]}
          radius={8}
          fillOpacity={0.7}
          color={getColorBasedOnPrice(property.Price)}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <div>
              <p><strong>Price:</strong> ${property.Price ? property.Price.toLocaleString() : "N/A"}</p>
              <p><strong>Rooms:</strong> {property.Rooms || "N/A"}</p>
              <p><strong>Building Area:</strong> {property.BuildingArea ? `${property.BuildingArea} sqm` : "N/A"}</p>
              <p><strong>Land Size:</strong> {property.Landsize ? `${property.Landsize} sqm` : "N/A"}</p>
              <p><strong>Distance from CBD:</strong> {property.Distance ? `${property.Distance} km` : "N/A"}</p>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const getColorBasedOnPrice = (price) => {
  if (price > 1000000) return "red";
  if (price > 500000) return "orange";
  return "green";
};

export default SuburbHeatmap;
