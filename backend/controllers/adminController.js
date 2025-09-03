const AdminGuideline = require("../models/AdminGuideline");

// Fetch all admin guidelines
const getAdminGuidelines = async (req, res) => {
  try {
    const guidelines = await AdminGuideline.find(); // fetch from MongoDB
    res.status(200).json(guidelines);
  } catch (err) {
    console.error("Error fetching admin guidelines:", err);
    res.status(500).json({ message: "Error fetching admin guidelines" });
  }
};

module.exports = { getAdminGuidelines };
