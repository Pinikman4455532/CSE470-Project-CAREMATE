import axios from "axios";

const API_URL = "http://localhost:5000/api/memory-vault";

// Upload a memory
export const uploadMemory = async (title, photo) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("photo", photo);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get all memories
export const getMemories = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Fetch memories failed:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a memory
export const deleteMemory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    throw err;
  }
};
