const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot",
            required: true,
        },
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        startHour: {
            type: Number,
            required: true,
            min: 0,
            max: 23,
        },
        endHour: {
            type: Number,
            required: true,
            min: 1,
            max: 24,
        },
        hours: {
            type: Number,
            required: true,
            min: 1,
        },
        pricePerHour: {
            type: Number,
            required: true,
        },
        peakMultiplier: {
            type: Number,
            required: true,
            default: 1,
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        pin: {
            type: String,
            required: true,
        },
        qrCode: {
            type: String,
        },
        vehicleNumber: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        status: {
            type: String,
            enum: ["Active", "Completed", "Cancelled"],
            default: "Active",
        },
        cancelledBy: {
            type: String,
            enum: ["user", "admin", null],
            default: null,
        },
        checkedIn: {
            type: Boolean,
            default: false,
        },
        checkInTime: {
            type: Date,
            default: null,
        },
        checkOutTime: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
