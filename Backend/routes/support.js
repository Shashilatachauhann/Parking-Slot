const express = require("express");
const router = express.Router();
const {
  createTicket,
  getMyTickets,
  getVenueTickets,
  getPlatformTickets,
  updateTicketStatus,
} = require("../controllers/supportController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.post("/", protect, createTicket);
router.get("/mine", protect, getMyTickets);
router.get("/venue", protect, restrictTo("admin"), getVenueTickets);
router.get("/platform", protect, restrictTo("admin"), getPlatformTickets);
router.patch("/:id/status", protect, restrictTo("admin"), updateTicketStatus);

module.exports = router;