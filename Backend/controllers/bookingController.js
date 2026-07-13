const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const { calculateFinalPrice } = require("../utils/pricing");
const { generatePIN, generateQRCode } = require("../utils/bookingCode");

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("slot", "slotNumber floor")
      .populate("venue", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching bookings", error: error.message });
  }
};

exports.getVenueBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ venue: req.user.venue })
      .populate("user", "name email phone")
      .populate("slot", "slotNumber floor")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching bookings", error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { slotId, date, startHour, endHour } = req.body;

    const start = Number(startHour);
    const end = Number(endHour);

    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
      return res.status(400).json({ message: "End time must be after start time" });
    }

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slot.isBooked) {
      return res.status(400).json({ message: "This slot is currently closed by the venue admin" });
    }

        const conflictingBooking = await Booking.findOne({
      slot: slotId,
      date,
      status: "Active",
      startHour: { $lt: end },
      endHour: { $gt: start },
    });

    if (conflictingBooking) {
      return res.status(409).json({
        message: `This slot is already booked from ${conflictingBooking.startHour}:00 to ${conflictingBooking.endHour}:00 on ${date}. Please choose a different time.`,
      });
    }

        const hours = end - start;
    const { finalPrice, peakMultiplier } = calculateFinalPrice({
      pricePerHour: slot.pricePerHour,
      hours,
      bookingStartHour: start,
    });

    const pin = generatePIN();

    const booking = await Booking.create({
      user: req.user._id,
      slot: slot._id,
      venue: slot.venue,
      date,
      startHour: start,
      endHour: end,
      hours,
      pricePerHour: slot.pricePerHour,
      peakMultiplier,
      finalPrice,
      pin,
      status: "Active",
    });

    const qrCode = await generateQRCode(booking._id.toString(), pin);
    booking.qrCode = qrCode;
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error.message);
    res.status(500).json({ message: "Something went wrong creating the booking", error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only cancel your own bookings" });
    }

        booking.status = "Cancelled";
    booking.cancelledBy = "user";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Cancel booking error:", error.message);
    res.status(500).json({ message: "Something went wrong cancelling the booking", error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!booking.venue || booking.venue.toString() !== req.user.venue.toString()) {
      return res.status(403).json({ message: "You can only manage bookings in your own venue" });
    }

    booking.status = status;
    if (status === "Cancelled") booking.cancelledBy = "admin";
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error("Update booking status error:", error.message);
    res.status(500).json({ message: "Something went wrong updating the booking", error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!booking.venue || booking.venue.toString() !== req.user.venue.toString()) {
      return res.status(403).json({ message: "You can only manage bookings in your own venue" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error.message);
    res.status(500).json({ message: "Something went wrong deleting the booking", error: error.message });
  }
};
