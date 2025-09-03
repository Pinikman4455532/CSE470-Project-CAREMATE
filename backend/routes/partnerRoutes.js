const express = require("express");
const router = express.Router();
const {
  upsertPartner,
  getPartner,
  removeItemFromPartner,
} = require("../controllers/partnerController");

router.get("/:userEmail", getPartner);
router.post("/upsert", upsertPartner);
router.post("/remove-item", removeItemFromPartner);

module.exports = router;
//