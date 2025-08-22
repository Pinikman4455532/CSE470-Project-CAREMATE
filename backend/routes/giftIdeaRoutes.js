const express = require("express");
const router = express.Router();
const { addGiftIdea, getGiftIdeas, deleteGiftIdea } = require("../controllers/GiftIdeaController");

// Routes
router.post("/", addGiftIdea);
router.get("/", getGiftIdeas);
router.delete("/:id", deleteGiftIdea);

module.exports = router;
