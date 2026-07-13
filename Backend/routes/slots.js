const express = require('express');
const router = express.Router();
const { getSlots, getSlotAvailability, createSlot, updateSlot, deleteSlot } = require("../controllers/slotController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

//USERS
router.get("/", getSlots);
router.get("/:id/availability", getSlotAvailability); 

//ADMIN
router.post("/", protect, restrictTo("admin"), createSlot);
router.patch("/:id", protect, restrictTo("admin"), updateSlot);
router.delete("/:id", protect, restrictTo("admin"), deleteSlot);

module.exports = router;