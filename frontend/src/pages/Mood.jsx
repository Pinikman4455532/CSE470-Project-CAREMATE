import React, { useEffect, useState } from "react";
import { addMood, getMoods } from "../controllers/moodController";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/Mood.css";

function Mood() {
  const [moods, setMoods] = useState([]);
  const [moodInput, setMoodInput] = useState("happy");
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      fetchMoods(user.id);
    }
  }, []);

  const fetchMoods = async (userId) => {
    try {
      const data = await getMoods(userId);
      setMoods(data);
    } catch (err) {
      console.error("Error fetching moods:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    const moodData = {
      userId,
      date: new Date(),
      mood: moodInput,
      intensity,
      note: note.toString()
    };

    try {
      await addMood(moodData);
      setNote("");
      setIntensity(5);
      setMoodInput("happy");
      fetchMoods(userId);
    } catch (err) {
      console.error("Error adding mood:", err);
    }
  };

  const handleReset = async () => {
    if (!userId) return;
    const confirmReset = window.confirm("Are you sure you want to delete all mood entries?");
    if (!confirmReset) return;

    try {
      await fetch(`http://localhost:5000/api/moods/all/${userId}`, { method: "DELETE" });
      setMoods([]);
    } catch (err) {
      console.error("Error deleting all moods:", err);
    }
  };

  const chartData = moods.map(m => ({
    label: `${new Date(m.date).toLocaleDateString()} - ${m.mood}`,
    intensity: m.intensity,
    note: m.note || ""
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: "white", border: "1px solid #ccc", padding: "10px" }}>
          <p><strong>{label}</strong></p>
          <p>Intensity: {payload[0].value}</p>
          {payload[0].payload.note && <p>Note: {payload[0].payload.note}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mood-container">
      {/* Left: Mood Form */}
      <div className="mood-form-container">
        <h2>Daily Mood Tracker</h2>
        <form onSubmit={handleSubmit} className="mood-form">
          <label>
            Mood:
            <select value={moodInput} onChange={e => setMoodInput(e.target.value)}>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="stressed">Stressed</option>
              <option value="excited">Excited</option>
              <option value="calm">Calm</option>
              <option value="anxious">Anxious</option>
              <option value="loved">Loved</option>
              <option value="ignored">Ignored</option>
              <option value="energetic">Energetic</option>
              <option value="neutral">Neutral</option>
            </select>
          </label>

          <label>
            Intensity (1–10):
            <input
              type="number"
              min="1"
              max="10"
              value={intensity}
              onChange={e => setIntensity(Number(e.target.value))}
            />
          </label>

          <label>
            Note (optional):
            <textarea value={note} onChange={e => setNote(e.target.value)} />
          </label>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit">Add Mood</button>
            <button type="button" onClick={handleReset} className="reset-btn">
              Reset All Moods
            </button>
          </div>
        </form>
      </div>

      {/* Right: Mood Chart */}
      <div className="mood-chart-container">
        <h3>Mood Trend</h3>
        {chartData.length === 0 ? (
          <p>No moods recorded yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="intensity" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Mood;
