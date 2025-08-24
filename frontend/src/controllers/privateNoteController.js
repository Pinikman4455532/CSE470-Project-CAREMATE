import axios from "axios";

const API_URL = "http://localhost:5000/api/private-notes";

export const getNotes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addNote = async (noteData) => {
  const res = await axios.post(API_URL, noteData);
  return res.data;
};

export const updateNote = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

