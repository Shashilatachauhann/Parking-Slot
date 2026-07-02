const express = require('express');
const router = express.Router();
const users = require('../db'); // Wahi central DB import kiya

router.post('/', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({ 
            message: "Login successful!", 
            user: { name: user.name, role: user.role } 
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;