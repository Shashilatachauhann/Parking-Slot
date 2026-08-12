const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Venue = require("../models/Venue");
const sendError = require("../utils/sendError");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone, role, venueName, venueLocation, venueCapacity } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists" });
        }

        if (role === "admin" && (!venueName || !venueLocation || !venueCapacity)) {
            return res.status(400).json({
                message: "Venue name, location, and capacity are required for admin signup",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role === "admin" ? "admin" : "user",
        });

        if (role === "admin") {
            const newVenue = await Venue.create({
                name: venueName,
                location: venueLocation,
                capacity: venueCapacity,
                owner: newUser._id,
            });

            newUser.venue = newVenue._id;
            await newUser.save();
        }

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                venue: newUser.venue,
            },
        });
    } catch (error) {
        sendError(res, 500, "Something went wrong during signup", error);
    }
};

//      LOGIN 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                venue: user.venue,
            },
        });
    } catch (error) {
        sendError(res, 500, "Something went wrong during login", error);
    }
};
  //CURRENT USER'S DATA
exports.getMe = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        sendError(res, 500, "Something went wrong", error);
    }
};
 // EDIT THE PROFILE 
exports.updateMe = async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (name !== undefined) req.user.name = name;
        if (phone !== undefined) req.user.phone = phone;

        await req.user.save();

        res.status(200).json({ message: "Profile updated successfully", user: req.user });
    } catch (error) {
        sendError(res, 500, "Something went wrong updating profile", error);
    }
};
