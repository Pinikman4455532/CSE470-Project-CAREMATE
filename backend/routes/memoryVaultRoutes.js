const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { uploadMemory, getMemories, deleteMemory } = require("../controllers/MemoryVaultController");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("photo"), uploadMemory);
router.get("/", getMemories);
router.delete("/:id", deleteMemory);

module.exports = router;
