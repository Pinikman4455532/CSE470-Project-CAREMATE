const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
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
