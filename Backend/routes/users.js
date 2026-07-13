const express = require("express");
const router = express.Router();
const { getVenueUsers } = require("../controllers/userController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/venue", protect, restrictTo("admin"), getVenueUsers);

module.exports = router;