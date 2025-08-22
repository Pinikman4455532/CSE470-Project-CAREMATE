import axios from "axios";

const API_URL = "http://localhost:5000/api/gift-ideas";

// Add a gift idea
export const addGiftIdea = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (err) {
    console.error("Add gift idea failed:", err.response?.data || err.message);
    throw err;
  }
};

// Get all gift ideas
export const getGiftIdeas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error("Fetch gift ideas failed:", err.response?.data || err.message);
    throw err;
  }
};

// Delete gift idea
export const deleteGiftIdea = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error("Delete gift idea failed:", err.response?.data || err.message);
    throw err;
  }
};
