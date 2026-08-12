const Support = require("../models/Support");
const sendError = require("../utils/sendError");

exports.createTicket = async (req, res) => {
  try {
    const { venueId, subject, message } = req.body;

    if (req.user.role === "user" && !venueId) {
      return res.status(400).json({ message: "Please select which venue your issue is about" });
    }

    const ticket = await Support.create({
      sender: req.user._id,
      senderRole: req.user.role,
      venue: req.user.role === "user" ? venueId : null,
      subject,
      message,
    });
     res.status(201).json(ticket);
  } catch (error) {
    sendError(res, 500, "Something went wrong sending your message", error);
  }
};


exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Support.find({ sender: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching your tickets", error);
  }
};

exports.getVenueTickets = async (req, res) => {
  try {
    const tickets = await Support.find({
      venue: req.user.venue,
      senderRole: "user",
    })
      .populate("sender", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching tickets", error);
  }
};

exports.getPlatformTickets = async (req, res) => {
  try {
    const tickets = await Support.find({ senderRole: "admin" })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    sendError(res, 500, "Something went wrong fetching tickets", error);
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    if (ticket.venue && ticket.venue.toString() !== req.user.venue.toString()) {
      return res.status(403).json({ message: "You can only update tickets for your own venue" });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    sendError(res, 500, "Something went wrong updating the ticket", error);
  }
};
