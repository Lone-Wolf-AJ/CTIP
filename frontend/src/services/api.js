import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getPredictedPrice = async (inputData) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, inputData);
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};

export const getHeatmapData = async () => {
  try {
    const response = await axios.get(`${API_URL}/heatmap`);
    return response.data;
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    throw error;
  }
};
