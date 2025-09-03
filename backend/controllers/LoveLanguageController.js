const LoveLanguageQuestion = require("../models/LoveLanguageQuestion");
const LoveLanguageResult = require("../models/LoveLanguageResult");

// GET all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await LoveLanguageQuestion.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching questions" });
  }
};

// POST submit result
const submitResult = async (req, res) => {
  try {
    const { userId, partnerId, result } = req.body;
    const newResult = await LoveLanguageResult.create({ userId, partnerId, result });
    res.status(201).json(newResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving result" });
  }
};

// GET past results for a user
const getResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await LoveLanguageResult.find({ userId });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching results" });
  }
};

module.exports = { getQuestions, submitResult, getResults };
