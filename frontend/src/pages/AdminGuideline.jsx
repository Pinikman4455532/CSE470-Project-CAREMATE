import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin.css"; // make sure to import the CSS file

const AdminGuideline = () => {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin-guidelines");
        setGuidelines(res.data);
      } catch (err) {
        console.error("Error fetching guidelines:", err);
      }
    };

    fetchGuidelines();
  }, []);

  return (
    <div className="admin-guidelines-wrapper">
      <div className="admin-guidelines-container">
        <h2>Admin Guidelines</h2>
        {guidelines.length > 0 ? (
          guidelines.map((item) => (
            <div key={item._id} className="guideline-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>Loading guidelines...</p>
        )}
      </div>
    </div>
  );
};

export default AdminGuideline;
