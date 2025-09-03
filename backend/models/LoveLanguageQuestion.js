const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: String,
  value: String,
});

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [optionSchema],
});

module.exports = mongoose.model("LoveLanguageQuestion", questionSchema);
