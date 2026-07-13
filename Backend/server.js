require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./db");
const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const venue = require("./routes/venue");
const slots = require("./routes/slots");
const booking = require("./routes/booking");
const support = require("./routes/support");
const users = require("./routes/users");
const stats = require("./routes/stats");

app.use("/api/auth", authRoutes);
app.use("/api/venues", venue);
app.use("/api/slots", slots);
app.use("/api/bookings", booking);
app.use("/api/support", support);
app.use("/api/users", users);
app.use("/api/stats", stats);

connectDB();

app.get('/', (req, res) => {
    res.send("ParkMate Backend is running perfectly!");
});
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

app.listen(5000, () => console.log("Server running on 5000..."));