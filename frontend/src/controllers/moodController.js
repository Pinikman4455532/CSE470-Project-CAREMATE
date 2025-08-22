const API_URL = "http://localhost:5000/api/moods";

// Add new mood entry
export const addMood = async (moodData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(moodData),
  });
  return response.json();
};

// Get moods for a specific user (optionally filter by month/year)
export const getMoods = async (userId, month, year) => {
  let url = `${API_URL}?userId=${userId}`;
  if (month && year) {
    url += `&month=${month}&year=${year}`;
  }
  const response = await fetch(url);
  return response.json();
};

// Update a mood entry
export const updateMood = async (id, moodData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(moodData),
  });
  return response.json();
};

// Delete a mood entry
export const deleteMood = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
