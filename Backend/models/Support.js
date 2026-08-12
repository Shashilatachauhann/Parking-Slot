const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
    {
        sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      default: null,
    },
    subject: {
      type: String,
      enum: ["Booking Issue", "Payment Issue", "Slot Problem", "Other"],
      default: "Other",
    },
    message: {
      type: String,
      required: [true, "Message cannot be empty"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Support", supportSchema);