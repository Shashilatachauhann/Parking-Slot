const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {

        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue",
            required: true,
        },
        slotNumber: {
            type: String,
            required: true, // e.g. "A-01"
            trim: true,
        },
        floor: {
            type: String,
            default: "Ground Floor",
        },
        pricePerHour: {
            type: Number,
            required: true,
            min: 0,
        },
        isBooked: {
            type: Boolean,
            default: false,
        },
        isEV: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);