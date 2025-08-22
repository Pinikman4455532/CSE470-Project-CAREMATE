const mongoose = require("mongoose");

const giftIdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Jewelry", "Books", "Clothes"
  occasion: { 
    type: String, 
    enum: ["Birthday", "Anniversary", "GirlfriendDay", "WomensDay", "Random"], 
    default: "Random" 
  },
  description: { type: String },
  link: { type: String }, // Optional URL to gift store
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GiftIdea", giftIdeaSchema);
