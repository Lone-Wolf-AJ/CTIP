import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Backend FastAPI URL

export const getPredictedPrice = async (inputData) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, inputData);
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
