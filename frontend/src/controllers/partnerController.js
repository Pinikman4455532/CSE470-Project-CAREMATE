const API = "http://localhost:5000/api/partner";

export const fetchPartner = async (email) => {
  const res = await fetch(`${API}/${email}`);
  return await res.json();
};

export const savePartner = async (data) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
