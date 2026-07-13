const express = require("express");
const router = express.Router();
const {
  getMyBookings,
  getVenueBookings,
  createBooking,
  cancelBooking,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/mine", protect, getMyBookings); 
router.get("/venue", protect, restrictTo("admin"), getVenueBookings); 
router.post("/", protect, createBooking); 
router.patch("/:id/cancel", protect, cancelBooking); 
router.patch("/:id/status", protect, restrictTo("admin"), updateBookingStatus); 
router.delete("/:id", protect, restrictTo("admin"), deleteBooking); 

module.exports = router;
