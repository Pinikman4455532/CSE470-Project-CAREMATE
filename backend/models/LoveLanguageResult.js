const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  partnerId: { type: String, required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LoveLanguageResult", resultSchema);
