const express = require("express");
const router = express.Router();
const {
  getDatesByUser,
  addDate,
  getUpcomingNotifications,
  deleteDate,
} = require("../controllers/importantDateController");

router.get("/:userEmail", getDatesByUser);
router.post("/add", addDate);
router.get("/notifications/:email", getUpcomingNotifications);
router.delete("/delete/:id", deleteDate);

module.exports = router;
//