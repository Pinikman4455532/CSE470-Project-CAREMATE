const Partner = require("../models/Partner");

// GET handler
const getPartner = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const partner = await Partner.findOne({ userEmail });
    res.status(200).json({ partner });
  } catch (err) {
    console.error("Get Partner Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};//

// POST handler with merge
const upsertPartner = async (req, res) => {
  const {
    userEmail,
    name,
    favoriteFoods = [],
    favoriteFlowers = [],
    favoriteColors = [],
    favoritePlaces = [],
    likes,
    dislikes,
    loveLanguage,
    notes,
  } = req.body;

  try {
    let partner = await Partner.findOne({ userEmail });

    if (partner) {
      partner.favoriteFoods = Array.from(new Set([...partner.favoriteFoods, ...favoriteFoods]));
      partner.favoriteFlowers = Array.from(new Set([...partner.favoriteFlowers, ...favoriteFlowers]));
      partner.favoriteColors = Array.from(new Set([...partner.favoriteColors, ...favoriteColors]));
      partner.favoritePlaces = Array.from(new Set([...partner.favoritePlaces, ...favoritePlaces]));
      partner.name = name || partner.name;
      partner.likes = likes || partner.likes;
      partner.dislikes = dislikes || partner.dislikes;
      partner.loveLanguage = loveLanguage || partner.loveLanguage;
      partner.notes = notes || partner.notes;
      await partner.save();
    } else {
      partner = new Partner({
        userEmail,
        name,
        favoriteFoods,
        favoriteFlowers,
        favoriteColors,
        favoritePlaces,
        likes,
        dislikes,
        loveLanguage,
        notes,
      });
      await partner.save();
    }

    res.status(200).json({ message: "Partner data saved", partner });
  } catch (err) {
    console.error("Upsert Partner Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


const removeItemFromPartner = async (req, res) => {
  const { userEmail, field, value } = req.body;

  const allowedFields = [
    "favoriteFoods",
    "favoriteFlowers",
    "favoriteColors",
    "favoritePlaces",
    "likes",
    "dislikes",
    "loveLanguage",
  ];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: "Invalid field" });
  }

  try {
    const partner = await Partner.findOne({ userEmail });
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    partner[field] = partner[field].filter((item) => item !== value);
    await partner.save();

    res.status(200).json({ message: "Item removed", partner });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  getPartner,
  upsertPartner,
  removeItemFromPartner,
};

