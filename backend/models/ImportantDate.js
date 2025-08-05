const mongoose = require("mongoose");

const importantDateSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, default: "event" },
});

module.exports = mongoose.model("ImportantDate", importantDateSchema);
