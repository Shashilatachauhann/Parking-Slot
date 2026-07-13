const Venue = require("../models/Venue");

exports.getMyVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.user.venue);
    if (!venue) {
      return res.status(404).json({ message: "No venue found for this admin" });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
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
    console.error("Update venue error:", error.message);
    res.status(500).json({ message: "Something went wrong updating venue", error: error.message });
  }
};

exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong fetching venues", error: error.message });
  }
};
