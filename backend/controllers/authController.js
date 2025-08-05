const User = require("../models/User");
const crypto = require("crypto");

// Simple SHA256 hash function (consider bcrypt in production)
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Register controller
exports.registerUser = async (req, res) => {
  try {
    const { name, age, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const newUser = new User({
      name,
      age,
      email,
      phone,
      password: hashPassword(password),
    });

    await newUser.save();//

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    const hashed = hashPassword(password);

    if (!user || user.password !== hashed) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get user profile by email
exports.getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Get profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
