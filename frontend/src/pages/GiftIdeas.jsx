import React, { useState, useEffect } from "react";
import { getGiftIdeas, addGiftIdea, deleteGiftIdea, toggleGiftDone } from "../controllers/giftIdeaController";
import "../styles/GiftIdeas.css";

function GiftIdeas() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("Birthday");
  const [giftIdeas, setGiftIdeas] = useState([]);

  // Fetch gift ideas from backend
  useEffect(() => {
    fetchGiftIdeas();
  }, []);

  const fetchGiftIdeas = async () => {
    try {
      const data = await getGiftIdeas();
      setGiftIdeas(data);
    } catch (err) {
      console.error("Error fetching gift ideas:", err);
    }
  };

  const handleAddGift = async (e) => {
    e.preventDefault();
    if (!title || !category) return alert("Please enter title and category");

    try {
      await addGiftIdea({ title, category, occasion });
      setTitle("");
      setCategory("");
      setOccasion("Birthday");
      fetchGiftIdeas();
    } catch (err) {
      console.error("Error adding gift idea:", err);
    }
  };

  const handleDeleteGift = async (id) => {
    try {
      await deleteGiftIdea(id);
      fetchGiftIdeas();
    } catch (err) {
      console.error("Error deleting gift idea:", err);
    }
  };

  const handleToggleDone = async (id) => {
    try {
      await toggleGiftDone(id);
      fetchGiftIdeas();
    } catch (err) {
      console.error("Error toggling done:", err);
    }
  };

  return (
    <div className="gift-container">
      {/* Left side form */}
      <div className="gift-form-container">
        <h2>Gift Ideas</h2>
        <form onSubmit={handleAddGift} className="gift-form">
          <input
            type="text"
            placeholder="Gift Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="GirlfriendDay">Girlfriend Day</option>
            <option value="WomensDay">Women Day</option>
            <option value="Random">Random Day</option>
          </select>
          <button type="submit" className="add-button">Add Gift Idea</button>
        </form>
      </div>

      {/* Right side saved ideas */}
      <div className="gift-display">
        <h3>Saved Gift Ideas</h3>
        {giftIdeas.length === 0 ? (
          <p className="empty-text">No gift ideas yet. Add some!</p>
        ) : (
          <ul>
            {giftIdeas.map((gift) => (
              <li key={gift._id} className={`gift-card ${gift.done ? "done" : ""}`}>
                <div>
                  <p><strong>Title:</strong> {gift.title}</p>
                  <p><strong>Category:</strong> {gift.category}</p>
                  <p><strong>Occasion:</strong> {gift.occasion}</p>
                </div>
                <div className="gift-actions">
                  <button className="delete-btn" onClick={() => handleDeleteGift(gift._id)}>Delete</button>
                  <button
                    className={`done-btn ${gift.done ? "done-active" : ""}`}
                    onClick={() => handleToggleDone(gift._id)}
                  >
                    {gift.done ? "✔️" : ""}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GiftIdeas;