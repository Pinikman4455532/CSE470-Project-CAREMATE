
const express = require("express");
const router = express.Router();
const { addGiftIdea, getGiftIdeas, deleteGiftIdea, toggleGiftDone } = require("../controllers/GiftIdeaController");

// Routes
router.post("/", addGiftIdea);
router.get("/", getGiftIdeas);
router.delete("/:id", deleteGiftIdea);
router.put("/toggle/:id", toggleGiftDone); // ✅ Correct place

module.exports = router;

