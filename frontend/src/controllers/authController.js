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
      // ✅ Store both the token and user info
      localStorage.setItem("token", result.token); // <-- store JWT token
      localStorage.setItem("user", JSON.stringify(result.user));

      alert("Login successful");
      // redirect to dashboard
      window.location.href = "/dashboard"; // or use navigate if using react-router
    } else {
      alert(result.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};
