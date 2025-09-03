import axios from "axios";

const API_URL = "http://localhost:5000/api/messages";

export const getRandomMessage = async (mood) => {
  const response = await axios.get(`${API_URL}/${mood}`);
  return response.data;
};
