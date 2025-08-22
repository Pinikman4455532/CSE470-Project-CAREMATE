const express = require("express");
const router = express.Router();
const {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/privateNoteController");

router.get("/", getNotes);
router.post("/", addNote);
router.put("/:id", updateNote);   // Update note
router.delete("/:id", deleteNote); // Delete note

module.exports = router;
