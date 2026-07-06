const express = require('express');
const router = express.Router();
const {users} = require('../db'); 

router.post('/', (req, res) => {
    const { name, email, password, role } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "User already exists!" });
    }

    users.push({ name, email, password, role });
    console.log("✅ User Added. Total Users:", users.length);
    res.status(201).json({ message: "Signup successful!" });
});

module.exports = router;