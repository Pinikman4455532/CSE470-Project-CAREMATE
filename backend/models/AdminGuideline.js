const mongoose = require("mongoose");

const adminGuidelineSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminGuideline", adminGuidelineSchema);
