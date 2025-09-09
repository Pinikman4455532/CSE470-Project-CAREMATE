import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import navigate for redirection
import "../styles/AuthPage.css";

const API_URL = "http://localhost:5000/api/auth";

function AuthPage() {
  const navigate = useNavigate(); // ⬅️ Hook for redirection

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "login" : "register";

      let bodyData = {};
      if (isLogin) {
        bodyData = { email: formData.email, password: formData.password };
      } else {
        bodyData = {
          name: formData.name,
          age: formData.age ? parseInt(formData.age) : undefined,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        };
      }

      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage(data.message || "Success!");
        if (isLogin) {
          // 🔹 Save token & user info after login
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          navigate("/dashboard"); // redirect after login
        } else {
          setIsLogin(true); // switch to login after successful signup
        }
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </>
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className="auth-toggle-btn"
        >
          {isLogin ? "Create new account" : "Have an account? Login"}
        </button>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

export default AuthPage;