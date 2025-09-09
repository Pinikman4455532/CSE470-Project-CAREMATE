import React, { useState } from "react";
import { fetchMessageByMood } from "../controllers/complimentController";
import "../styles/Compliment.css";

const moods = ["happy", "sad", "romantic", "stressed", "angry"];

const ComplimentGenerator = () => {
  const [message, setMessage] = useState("");

  const handleClick = (mood) => {
    fetchMessageByMood(mood, setMessage);
  };

  return (
    <div className="compliment-generator">
      <h1>Compliment Generator❤️</h1>
      <div className="buttons-container">
        {moods.map((mood) => (
          <button key={mood} onClick={() => handleClick(mood)}>
            {mood.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="message-box">{message}</div>
    </div>
  );
};

export default ComplimentGenerator;