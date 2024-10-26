import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getPredictedPrice = async (inputData) => {
  try {
    // Make sure this is a POST request
    const response = await axios.post(`${API_URL}/predict`, inputData);
    return response.data;  // Return the prediction result
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
