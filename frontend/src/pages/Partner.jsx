import React, { useEffect, useState } from "react";
import "../styles/Partner.css";

const API_URL = "http://localhost:5000/api/partner";

function Partner() {
  const [formData, setFormData] = useState({
    userEmail: "",
    name: "",
    favoriteFoods: "",
    favoriteFlowers: "",
    favoriteColors: "",
    favoritePlaces: "",
    likes: "",
    dislikes: "",
    loveLanguage: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const [savedPartner, setSavedPartner] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setMessage("You must login first");
      return;
    }

    const { email } = JSON.parse(storedUser);
    setFormData((prev) => ({ ...prev, userEmail: email }));

    fetch(`${API_URL}/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.partner) {
          setSavedPartner(data.partner);
        }
      })
      .catch((err) => console.error("Fetch partner error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare new inputs as arrays
    const newFoods = formData.favoriteFoods.split(",").map(f => f.trim()).filter(Boolean);
    const newFlowers = formData.favoriteFlowers.split(",").map(f => f.trim()).filter(Boolean);
    const newColors = formData.favoriteColors.split(",").map(c => c.trim()).filter(Boolean);
    const newPlaces = formData.favoritePlaces.split(",").map(p => p.trim()).filter(Boolean);
    const newLikes = formData.likes.split(",").map(d => d.trim()).filter(Boolean);
    const newDislikes = formData.dislikes.split(",").map(d => d.trim()).filter(Boolean);
    const newLoveLangs = formData.loveLanguage.split(",").map(l => l.trim()).filter(Boolean);

    // Merge with existing savedPartner data if any, else empty arrays
    const payload = {
      ...formData,
      favoriteFoods: [...new Set([...(savedPartner?.favoriteFoods || []), ...newFoods])],
      favoriteFlowers: [...new Set([...(savedPartner?.favoriteFlowers || []), ...newFlowers])],
      favoriteColors: [...new Set([...(savedPartner?.favoriteColors || []), ...newColors])],
      favoritePlaces: [...new Set([...(savedPartner?.favoritePlaces || []), ...newPlaces])],
      likes: [...new Set([...(savedPartner?.likes || []), ...newLikes])],
      dislikes: [...new Set([...(savedPartner?.dislikes || []), ...newDislikes])],
      loveLanguage: [...new Set([...(savedPartner?.loveLanguage || []), ...newLoveLangs])],
    };

    try {
      const res = await fetch(`${API_URL}/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Partner info saved!");
        if (data.partner) {
          setSavedPartner(data.partner);

          setFormData((prev) => ({
            ...prev,
            name: "",
            favoriteFoods: "",
            favoriteColors: "",
            favoriteFlowers: "",
            favoritePlaces: "",
            likes: "",
            dislikes: "",
            loveLanguage: "",
            notes: "",
          }));
        }
      } else {
        setMessage(data.error || "Failed to save");
      }
    } catch (err) {
      setMessage("Network error");
      console.error(err);
    }
  };

  const handleRemove = async (field, value) => {
    try {
      const res = await fetch(`${API_URL}/remove-item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: formData.userEmail,
          field,
          value,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSavedPartner(data.partner);
        setMessage("Item removed successfully");
      } else {
        setMessage(data.error || "Failed to remove item");
      }
    } catch (err) {
      console.error("Remove error:", err);
      setMessage("Error removing item");
    }
  };

  return (
    <div className="partner-form-container">
      <h2>Partner Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Partner Name" value={formData.name} onChange={handleChange} />
        <input name="favoriteFoods" placeholder="Favorite Foods" value={formData.favoriteFoods} onChange={handleChange} />
        <input name="favoriteFlowers" placeholder="Favorite Flowers" value={formData.favoriteFlowers} onChange={handleChange} />
        <input name="favoriteColors" placeholder="Favorite Colors" value={formData.favoriteColors} onChange={handleChange} />
        <input name="favoritePlaces" placeholder="Favorite Places" value={formData.favoritePlaces} onChange={handleChange} />
        <input name="likes" placeholder="Likes" value={formData.likes} onChange={handleChange} />
        <input name="dislikes" placeholder="Dislikes" value={formData.dislikes} onChange={handleChange} />
        <input name="loveLanguage" placeholder="Love Language" value={formData.loveLanguage} onChange={handleChange} />
        <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange} />
        <button type="submit">Save Partner Info</button>
      </form>

      {message && <p>{message}</p>}

      {savedPartner && (
        <div className="partner-info-display" style={{ marginTop: "2rem" }}>
          <h3>Saved Partner Details:</h3>
          <p><strong>Name:</strong> {savedPartner.name || "Not set"}</p>

          <RenderArray field="favoriteFoods" label="Favorite Foods" values={savedPartner.favoriteFoods} onRemove={handleRemove} />
          <RenderArray field="favoriteFlowers" label="Favorite Flowers" values={savedPartner.favoriteFlowers} onRemove={handleRemove} />
          <RenderArray field="favoriteColors" label="Favorite Colors" values={savedPartner.favoriteColors} onRemove={handleRemove} />
          <RenderArray field="favoritePlaces" label="Favorite Places" values={savedPartner.favoritePlaces} onRemove={handleRemove} />
          <RenderArray field="likes" label="Likes" values={savedPartner.likes} onRemove={handleRemove} />
          <RenderArray field="dislikes" label="Dislikes" values={savedPartner.dislikes} onRemove={handleRemove} />
          <RenderArray field="loveLanguage" label="Love Language" values={savedPartner.loveLanguage} onRemove={handleRemove} />

          <p><strong>Notes:</strong> {savedPartner.notes || "None"}</p>
        </div>
      )}
    </div>
  );
}

function RenderArray({ label, values = [], field, onRemove }) {
  return (
    <div>
      <p><strong>{label}:</strong></p>
      <ul>
        {values.length === 0 ? (
          <li>Not set</li>
        ) : (
          values.map((item, i) => (
            <li key={i}>
              {item}{" "}
              <button onClick={() => onRemove(field, item)}>-</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Partner;