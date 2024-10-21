import axios from 'axios';

const API_URL = 'http://localhost:8000';  // FastAPI server URL

// Function to send user input data to FastAPI and get the prediction
export const getPredictedPrice = async (inputData) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, inputData);
    return response.data;  // Returning the prediction result
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
