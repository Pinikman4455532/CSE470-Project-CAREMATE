const express = require("express");
const router = express.Router();
const { getRandomMessage } = require("../controllers/messageController");

// Route: /api/messages/:mood
router.get("/:mood", getRandomMessage);

module.exports = router;
