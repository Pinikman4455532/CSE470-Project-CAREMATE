const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  mood: { type: String, required: true },
  intensity: { type: Number, required: true },
  note: { type: String, default: "" }, // ✅ must be string
});

module.exports = mongoose.model("Mood", MoodSchema);
