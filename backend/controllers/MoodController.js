const Mood = require("../models/MoodModel");

// Add a mood entry
exports.addMood = async (req, res) => {
    try {
        const { userId, date, mood, intensity, note } = req.body;

        const newMood = new Mood({ userId, date, mood, intensity, note });
        const savedMood = await newMood.save();

        res.status(201).json(savedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get moods for a specific user (optionally by month)
exports.getMoods = async (req, res) => {
    try {
        const { userId, month, year } = req.query;

        let query = { userId };
        if (month && year) {
            query.date = {
                $gte: new Date(year, month - 1, 1),
                $lte: new Date(year, month, 0)
            };
        }

        const moods = await Mood.find(query).sort({ date: 1 });
        res.status(200).json(moods);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a mood entry
exports.updateMood = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMood = await Mood.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedMood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a mood entry
exports.deleteMood = async (req, res) => {
    try {
        const { id } = req.params;
        await Mood.findByIdAndDelete(id);
        res.status(200).json({ message: "Mood deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete all moods for a specific user
exports.deleteAllMoods = async (req, res) => {
  try {
    const { userId } = req.params;
    await Mood.deleteMany({ userId });
    res.status(200).json({ message: "All moods deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
