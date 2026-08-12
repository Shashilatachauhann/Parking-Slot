const Booking = require("../models/Booking");
const User = require("../models/User");
const sendError = require("../utils/sendError");

exports.getVenueUsers = async (req, res) => {
  try {
        const userIds = await Booking.distinct("user", { venue: req.user.venue });

    const users = await User.find({ _id: { $in: userIds } }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching users", error);
  }
};

