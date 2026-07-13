const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const Venue = require("../models/Venue");

exports.getPublicStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const [venueCount, availableSlots, bookingsToday] = await Promise.all([
      Venue.countDocuments(),
      Slot.countDocuments({ isBooked: false }),
      Booking.countDocuments({ date: today, status: { $ne: "Cancelled" } }),
    ]);

    res.status(200).json({ venues: venueCount, availableSlots, bookingsToday });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching stats", error: error.message });
  }
};

exports.getVenueStats = async (req, res) => {
  try {
    const venueId = req.user.venue;

    const bookings = await Booking.find({ venue: venueId });

    const revenue = bookings
      .filter((b) => b.status !== "Cancelled")
      .reduce((sum, b) => sum + b.finalPrice, 0);

    const totalBookings = bookings.length;
    const uniqueUsers = new Set(bookings.map((b) => b.user.toString())).size;
    const availableSlots = await Slot.countDocuments({ venue: venueId, isBooked: false });

    res.status(200).json({
      revenue,
      bookings: totalBookings,
      users: uniqueUsers,
      available: availableSlots,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching venue stats", error: error.message });
  }
};

exports.getVenueChartData = async (req, res) => {
  try {
    const venueId = req.user.venue;
    const bookings = await Booking.find({ venue: venueId });

    const grouped = {};
    bookings.forEach((b) => {
      if (!grouped[b.date]) {
        grouped[b.date] = { name: b.date, revenue: 0, bookings: 0 };
      }
      grouped[b.date].revenue += b.finalPrice;
      grouped[b.date].bookings += 1;
    });

    const chartData = Object.values(grouped).sort((a, b) => (a.name > b.name ? 1 : -1));

    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching chart data", error: error.message });
  }
};