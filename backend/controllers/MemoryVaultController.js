const MemoryVault = require("../models/MemoryVault");
const fs = require("fs");
const path = require("path");

// Upload memory
exports.uploadMemory = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const memory = new MemoryVault({
      title: req.body.title,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await memory.save();
    res.status(201).json({ message: "Memory uploaded successfully", memory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all memories
exports.getMemories = async (req, res) => {
  try {
    const memories = await MemoryVault.find().sort({ uploadedAt: -1 });
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a memory
exports.deleteMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const memory = await MemoryVault.findById(id);
    if (!memory) return res.status(404).json({ message: "Memory not found" });

    // Delete file from uploads
    const filePath = path.join(__dirname, "..", memory.imageUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    await MemoryVault.findByIdAndDelete(id);
    res.status(200).json({ message: "Memory deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
