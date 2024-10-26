import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getHeatmapData } from '../services/api';

const Heatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHeatmapData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <MapContainer center={[-37.8136, 144.9631]} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Add heatmap data layer here if using a heatmap library */}
    </MapContainer>
  );
};

export default Heatmap;
