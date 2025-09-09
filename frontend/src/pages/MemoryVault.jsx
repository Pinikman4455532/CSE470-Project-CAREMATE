import React, { useState, useEffect } from "react";
import { uploadMemory, getMemories, deleteMemory } from "../controllers/memoryVaultController";
import "../styles/MemoryVault.css";

function MemoryVault() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [memories, setMemories] = useState([]);

  // Fetch all memories on mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMemories();
      setMemories(data);
    };
    fetchData();
  }, []);

  // Handle memory upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !photo) return alert("Please provide a title and select a photo");

    try {
      const data = await uploadMemory(title, photo); // upload memory
      setTitle("");
      setPhoto(null);
      setMemories(prev => [data.memory, ...prev]); // add new memory on top
    } catch (err) {
      console.error(err);
      alert("Failed to upload memory");
    }
  };

  // Handle memory deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this memory?")) return;
    try {
      await deleteMemory(id);
      setMemories(prev => prev.filter(memory => memory._id !== id));
    } catch (err) {
      alert("Failed to delete memory");
    }
  };

  return (
    <div className="memory-vault-container">
      <h2>Memory Vault</h2>

      <form onSubmit={handleSubmit} className="memory-upload-form">
        <input
          type="text"
          placeholder="Memory Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit">Upload Memory</button>
      </form>

      <div className="memories-grid">
        {memories.map((memory) => (
          <div key={memory._id} className="memory-card">
            <img src={`http://localhost:5000${memory.imageUrl}`} alt={memory.title} />
            <h4>{memory.title}</h4>
            <button onClick={() => handleDelete(memory._id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryVault;