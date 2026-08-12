const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const { calculateFinalPrice } = require("../utils/pricing");
const { generatePIN, generateQRCode } = require("../utils/bookingCode");
const sendError = require("../utils/sendError");

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("slot", "slotNumber floor")
      .populate("venue", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching bookings", error);
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
    sendError(res, 500, "Something went wrong fetching bookings", error);
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { slotId, date, startHour, endHour, vehicleNumber } = req.body;

    const start = Number(startHour);
    const end = Number(endHour);

    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
      return res.status(400).json({ message: "End time must be after start time" });
    }

    if (!vehicleNumber || !vehicleNumber.trim()) {
      return res.status(400).json({ message: "Vehicle number is required" });
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
      vehicleNumber: vehicleNumber.trim(),
      status: "Active",
    });

    const qrCode = await generateQRCode(booking._id.toString(), pin);
    booking.qrCode = qrCode;
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    sendError(res, 500, "Something went wrong creating the booking", error);
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


    await Slot.findByIdAndUpdate(booking.slot, { isBooked: false });

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    sendError(res, 500, "Something went wrong cancelling the booking", error);
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

    if (status === "Cancelled" || status === "Completed") {
      await Slot.findByIdAndUpdate(booking.slot, { isBooked: false });
    }

    res.status(200).json(booking);
  } catch (error) {
    sendError(res, 500, "Something went wrong updating the booking", error);
  }
};

exports.checkInBooking = async (req, res) => {
  try {
    const { pin, date } = req.body;

    if (!pin || !date) {
      return res.status(400).json({ message: "PIN and date are required" });
    }

    const booking = await Booking.findOne({ pin, date, venue: req.user.venue })
      .populate("user", "name phone")
      .populate("slot", "slotNumber floor");

    if (!booking) {
      return res.status(404).json({ message: "No matching booking found for this PIN and date" });
    }
    if (booking.status !== "Active") {
      return res.status(400).json({ message: `This booking is ${booking.status.toLowerCase()}, not active` });
    }
    if (booking.checkedIn) {
      return res.status(400).json({ message: "This vehicle has already been checked in" });
    }

    booking.checkedIn = true;
    booking.checkInTime = new Date();
    await booking.save();

    res.status(200).json({ message: "Entry confirmed", booking });
  } catch (error) {
    sendError(res, 500, "Something went wrong checking in this booking", error);
  }
};

exports.checkOutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!booking.venue || booking.venue.toString() !== req.user.venue.toString()) {
      return res.status(403).json({ message: "You can only manage bookings in your own venue" });
    }
    if (!booking.checkedIn) {
      return res.status(400).json({ message: "This vehicle hasn't been checked in yet" });
    }
    if (booking.checkOutTime) {
      return res.status(400).json({ message: "This vehicle has already been checked out" });
    }

    const now = new Date();
    booking.checkOutTime = now;
    booking.status = "Completed";
    await booking.save();

    await Slot.findByIdAndUpdate(booking.slot, { isBooked: false });

    const bookedEnd = new Date(`${booking.date}T${String(booking.endHour).padStart(2, "0")}:00:00`);
    const overstayMinutes = Math.max(0, Math.round((now - bookedEnd) / 60000));

    res.status(200).json({ message: "Exit confirmed", booking, overstayMinutes });
  } catch (error) {
    sendError(res, 500, "Something went wrong checking out this booking", error);
  }
};

exports.getCurrentlyParked = async (req, res) => {
  try {
    const bookings = await Booking.find({
      venue: req.user.venue,
      checkedIn: true,
      status: "Active",
    })
      .populate("user", "name phone")
      .populate("slot", "slotNumber floor")
      .sort({ checkInTime: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching currently parked vehicles", error);
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
    sendError(res, 500, "Something went wrong deleting the booking", error);
  }
};
