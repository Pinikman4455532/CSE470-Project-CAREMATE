const mongoose = require("mongoose");

const memoryVaultSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MemoryVault", memoryVaultSchema);
