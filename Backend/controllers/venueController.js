const Venue = require("../models/Venue");
const sendError = require("../utils/sendError");

exports.getMyVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.user.venue);
    if (!venue) {
      return res.status(404).json({ message: "No venue found for this admin" });
    }
    res.status(200).json(venue);
  } catch (error) {
    sendError(res, 500, "Something went wrong", error);
  }
};

exports.updateMyVenue = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    const venue = await Venue.findById(req.user.venue);
    if (!venue) {
      return res.status(404).json({ message: "No venue found for this admin" });
    }

    if (name !== undefined) venue.name = name;
    if (location !== undefined) venue.location = location;
    if (capacity !== undefined) venue.capacity = capacity;

    await venue.save();

    res.status(200).json({ message: "Venue updated successfully", venue });
  } catch (error) {
    sendError(res, 500, "Something went wrong updating venue", error);
  }
};

exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching venues", error);
  }
};
