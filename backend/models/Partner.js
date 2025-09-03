const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userEmail: { type: String, required: true },
  name: String,
  favoriteFoods: [String],
  favoriteFlowers: [String],
  favoriteColors: [String],
  favoritePlaces: [String],
  likes: [String],
  dislikes: [String],
  loveLanguage: [String],
  notes: String,
});

module.exports = mongoose.model("Partner", PartnerSchema);
