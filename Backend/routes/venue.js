const express = require("express");
const router = express.Router();
const { getMyVenue, updateMyVenue, getAllVenues } = require("../controllers/venueController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

//USERs
router.get("/", getAllVenues);

//ADMINs
router.get("/mine", protect, restrictTo("admin"), getMyVenue);
router.put("/mine", protect, restrictTo("admin"), updateMyVenue);

module.exports = router;