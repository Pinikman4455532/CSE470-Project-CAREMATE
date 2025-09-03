const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  mood: { type: String, required: true }, // e.g., "happy", "sad", "romantic"
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
