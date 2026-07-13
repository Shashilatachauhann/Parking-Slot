const Slot = require("../models/Slot");
const Booking = require("../models/Booking");

exports.getSlots = async (req, res) => {
  try {
    const { venue, evOnly } = req.query;

    const filter = {};
    if (venue) filter.venue = venue;
    if (evOnly === "true") filter.isEV = true;

        const slots = await Slot.find(filter).populate("venue", "name location");

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching slots", error: error.message });
  }
};


exports.getSlotAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "A date query parameter is required" });
    }

    const bookings = await Booking.find({
      slot: req.params.id,
      date,
      status: "Active",
    }).select("startHour endHour -_id");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong checking availability", error: error.message });
  }
};

exports.createSlot = async (req, res) => {
  try {
    const { slotNumber, floor, pricePerHour, isEV } = req.body;

    const newSlot = await Slot.create({
      venue: req.user.venue, // always the logged-in admin's own venue
      slotNumber,
      floor,
      pricePerHour,
      isEV: !!isEV,
    });

    res.status(201).json(newSlot);
  } catch (error) {
    console.error("Create slot error:", error.message);
    res.status(500).json({ message: "Something went wrong creating slot", error: error.message });
  }
};

exports.updateSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slot.venue.toString() !== req.user.venue.toString()) {
      return res.status(403).json({ message: "You can only manage slots in your own venue" });
    }

    const { slotNumber, floor, pricePerHour, isEV, isBooked } = req.body;
    if (slotNumber !== undefined) slot.slotNumber = slotNumber;
    if (floor !== undefined) slot.floor = floor;
    if (pricePerHour !== undefined) slot.pricePerHour = pricePerHour;
    if (isEV !== undefined) slot.isEV = isEV;
    if (isBooked !== undefined) slot.isBooked = isBooked;

    await slot.save();
    res.status(200).json(slot);
  } catch (error) {
    console.error("Update slot error:", error.message);
    res.status(500).json({ message: "Something went wrong updating slot", error: error.message });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slot.venue.toString() !== req.user.venue.toString()) {
      return res.status(403).json({ message: "You can only manage slots in your own venue" });
    }

    await slot.deleteOne();
    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (error) {
    console.error("Delete slot error:", error.message);
    res.status(500).json({ message: "Something went wrong deleting slot", error: error.message });
  }
};