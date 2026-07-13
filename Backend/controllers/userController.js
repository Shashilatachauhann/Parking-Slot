const Booking = require("../models/Booking");
const User = require("../models/User");

exports.getVenueUsers = async (req, res) => {
  try {
        const userIds = await Booking.distinct("user", { venue: req.user.venue });

    const users = await User.find({ _id: { $in: userIds } }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching users", error: error.message });
  }
};