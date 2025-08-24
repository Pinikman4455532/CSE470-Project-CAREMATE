const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vite frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("DB Name:", mongoose.connection.db.databaseName); // Debug DB
  })
  .catch((err) => console.error("❌ DB connection failed:", err));

// ================= ROUTES =================

// Auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Partner
const partnerRoutes = require("./routes/partnerRoutes");
app.use("/api/partner", partnerRoutes);

// Important Dates
const importantDateRoutes = require("./routes/importantDateRoutes");
app.use("/api/important-dates", importantDateRoutes);

// Memory Vault
const memoryVaultRoutes = require("./routes/memoryVaultRoutes");
app.use("/api/memory-vault", memoryVaultRoutes);

// Private Notes
const privateNoteRoutes = require("./routes/privateNoteRoutes");
app.use("/api/private-notes", privateNoteRoutes);

// Gift Ideas
const giftIdeaRoutes = require("./routes/giftIdeaRoutes");
app.use("/api/gift-ideas", giftIdeaRoutes);

// Daily Mood Tracker
const moodRoutes = require("./routes/moodRoutes");
app.use("/api/moods", moodRoutes);

// ==========================================

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
