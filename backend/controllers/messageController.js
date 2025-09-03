const Message = require("../models/Message");

// Get random message by mood
exports.getRandomMessage = async (req, res) => {
  const { mood } = req.params;
  try {
    const messages = await Message.find({ mood });
    if (!messages.length) {
      return res.status(404).json({ message: "No messages found for this mood" });
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    res.json(messages[randomIndex]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
