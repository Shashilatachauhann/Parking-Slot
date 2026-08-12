const express = require("express");
const router = express.Router();
const {
  getMyBookings,
  getVenueBookings,
  createBooking,
  cancelBooking,
  updateBookingStatus,
  deleteBooking,
  checkInBooking,
  checkOutBooking,
  getCurrentlyParked,
} = require("../controllers/bookingController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/mine", protect, getMyBookings); 
router.get("/venue", protect, restrictTo("admin"), getVenueBookings); 
router.post("/", protect, createBooking); 
router.patch("/:id/cancel", protect, cancelBooking); 
router.patch("/:id/status", protect, restrictTo("admin"), updateBookingStatus); 
router.delete("/:id", protect, restrictTo("admin"), deleteBooking); 

router.get("/venue/parked", protect, restrictTo("admin"), getCurrentlyParked);
router.post("/checkin", protect, restrictTo("admin"), checkInBooking);
router.patch("/:id/checkout", protect, restrictTo("admin"), checkOutBooking);

module.exports = router;
