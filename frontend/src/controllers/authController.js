const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    console.error("Register error:", err);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      localStorage.setItem("userEmail", result.user.email);
      alert("Login successful");
      // redirect to dashboard if needed
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};
