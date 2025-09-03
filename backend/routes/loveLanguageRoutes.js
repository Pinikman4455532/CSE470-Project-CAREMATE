const express = require("express");
const router = express.Router();
const { getQuestions, submitResult, getResults } = require("../controllers/LoveLanguageController");

// Fetch all questions
router.get("/questions", getQuestions);

// Submit a quiz result
router.post("/submit", submitResult);

// Fetch user's past results
router.get("/results/:userId", getResults);

module.exports = router;
