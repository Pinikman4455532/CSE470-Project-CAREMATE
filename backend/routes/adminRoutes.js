const express = require("express");
const router = express.Router();
const { getAdminGuidelines } = require("../controllers/adminController");

// GET all admin guidelines
router.get("/", getAdminGuidelines);

module.exports = router;
