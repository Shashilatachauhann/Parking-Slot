const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
    {
        name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Venue location is required"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Venue capacity is required"],
      min: 1,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    },
    { timestamps: true }

);

module.exports = mongoose.model("Venue", venueSchema);