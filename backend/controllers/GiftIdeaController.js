const GiftIdea = require("../models/GiftIdea");

// Add a gift idea
exports.addGiftIdea = async (req, res) => {
  try {
    const { title, category, occasion, description, link } = req.body;
    const newGift = new GiftIdea({ title, category, occasion, description, link });
    await newGift.save();
    res.status(201).json({ message: "Gift idea added successfully", gift: newGift });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all gift ideas
exports.getGiftIdeas = async (req, res) => {
  try {
    const gifts = await GiftIdea.find().sort({ createdAt: -1 });
    res.status(200).json(gifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a gift idea
exports.deleteGiftIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const gift = await GiftIdea.findById(id);
    if (!gift) return res.status(404).json({ message: "Gift idea not found" });

    await GiftIdea.findByIdAndDelete(id);
    res.status(200).json({ message: "Gift idea deleted successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
