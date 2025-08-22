import React, { useState, useEffect } from "react";

function GiftIdeas() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("birthday");
  const [giftIdeas, setGiftIdeas] = useState([]);

  // Load existing gift ideas (optional: from backend)
  useEffect(() => {
    // fetchGiftIdeas();
  }, []);

  const handleAddGift = (e) => {
    e.preventDefault();
    if (!title || !category) return alert("Please enter title and category");

    const newGift = { title, category, occasion };
    setGiftIdeas(prev => [...prev, newGift]);
    setTitle("");
    setCategory("");
    setOccasion("birthday");
  };

  return (
    <div className="gift-ideas-container">
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
          placeholder="Category (e.g., tech, flowers)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="girlfriendday">Girlfriend Day</option>
          <option value="womenday">Women Day</option>
          <option value="random">Random Day</option>
        </select>
        <button type="submit">Add Gift Idea</button>
      </form>

      <div className="gift-list">
        <h3>Saved Gift Ideas:</h3>
        {giftIdeas.map((gift, index) => (
          <div key={index} className="gift-card">
            <p><strong>Title:</strong> {gift.title}</p>
            <p><strong>Category:</strong> {gift.category}</p>
            <p><strong>Occasion:</strong> {gift.occasion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftIdeas;
