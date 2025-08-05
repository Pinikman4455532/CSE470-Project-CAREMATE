import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Dashboard.css";

const API_AUTH = "http://localhost:5000/api/auth";
const API_PARTNER = "http://localhost:5000/api/partner";
const API_DATES = "http://localhost:5000/api/important-dates";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // redirect to login
      return;
    }

    const { email } = JSON.parse(storedUser);

    // Fetch user profile
    fetch(`${API_AUTH}/profile/${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          navigate("/");
        }
      })
      .catch(() => navigate("/"));

    // Fetch partner info
    fetch(`${API_PARTNER}/${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.partner && data.partner.name) {
          setPartnerName(data.partner.name);
        } else {
          setPartnerName(""); // no partner yet
        }
      })
      .catch(err => {
        console.error("Error fetching partner:", err);
        setPartnerName("");
      });

    // Fetch upcoming notifications
    fetch(`${API_DATES}/notifications/${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      })
      .catch(err => console.error("Error fetching notifications:", err));
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <h2>Welcome, {user.name}!</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age || "Not set"}</p>
        <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
        <p><strong>Partner Name:</strong> {partnerName || "No partner info yet"}</p>
      </div>

      


      {notifications.length > 0 && (
        <div className="notification-box">
          <h4>🔔 Upcoming Events:</h4>
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="buttons-container">
        <Link to="/partner">
          <button>Partner</button>
        </Link>
        <Link to="/important-dates">
          <button>Important Dates</button>
        </Link>
      </div>
    </div>
  );

}

export default Dashboard;
