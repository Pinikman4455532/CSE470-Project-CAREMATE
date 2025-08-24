const mongoose = require("mongoose");

const giftIdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  occasion: { 
    type: String, 
    enum: ["Birthday", "Anniversary", "GirlfriendDay", "WomensDay", "Random"], 
    default: "Random" 
  },
  description: { type: String },
  link: { type: String },
  done: { type: Boolean, default: false }, // new field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GiftIdea", giftIdeaSchema);
