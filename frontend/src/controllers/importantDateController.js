const API = "http://localhost:5000/api/important-dates";

export const fetchImportantDates = async (email) => {
  const res = await fetch(`${API}/${email}`);
  return await res.json();
};

export const addImportantDate = async (data) => {
  const res = await fetch(`${API}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteImportantDate = async (id) => {
  const res = await fetch(`${API}/delete/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
