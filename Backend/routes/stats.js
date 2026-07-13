const express = require('express');
const router = express.Router();
const { getVenueStats, getVenueChartData, getPublicStats } = require("../controllers/statsController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/public", getPublicStats);
router.get("/venue", protect, restrictTo("admin"), getVenueStats);
router.get("/venue/chart", protect, restrictTo("admin"), getVenueChartData); 

module.exports = router;