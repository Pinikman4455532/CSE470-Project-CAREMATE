const express = require("express");
const router = express.Router();
const moodController = require("../controllers/MoodController");

// Add a mood
router.post("/", moodController.addMood);

// Get moods (all or filtered by month/year)
router.get("/", moodController.getMoods);

// Update mood
router.put("/:id", moodController.updateMood);

// Delete mood
router.delete("/:id", moodController.deleteMood);

// Delete all moods
router.delete("/all/:userId", moodController.deleteAllMoods);

module.exports = router;
