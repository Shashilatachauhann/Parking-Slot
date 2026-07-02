const express = require('express');
const router = express.Router();
const slots = require('../db'); 

router.get('/', (req, res) => {
    res.json({ slots });
});

router.post('/', (req, res) => {
    const { slotNumber, location, price } = req.body;
    const newSlot = { 
        id: Date.now(), 
        slotNumber, 
        location, 
        price, 
        isBooked: false 
    };
    
    slots.push(newSlot);
    res.status(201).json({ message: "Slot added!", slot: newSlot });
});

module.exports = router;