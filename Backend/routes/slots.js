const express = require('express');
const router = express.Router();
let { slots } = require('../db');

router.get('/', (req, res) => {
    const { location } = req.query;

    if (location) {
        const filtered = slots.filter(slot =>
            slot.location.toLowerCase().includes(location.toLowerCase())
        );
        return res.json(filtered);
    }

    res.json(slots);
});
// to Add a new slot
router.post('/', (req, res) => {
    const { slotNumber, venue, location, floor, price } = req.body;
    const newSlot = {
        id: Date.now().toString(),
        slotNumber,
        venue,
        location,
        floor,
        price,
        isBooked: false
    };
    slots.push(newSlot);
    res.status(201).json(newSlot);
});

// Remove a slot
router.delete('/:id', (req, res) => {
    const index = slots.findIndex(s => s.id === req.params.id);

    if (index !== -1) {
        slots.splice(index, 1);
        res.json({ message: "Slot successfully deleted!" });
    } else {
        res.status(404).json({ message: "Slot not found!" });
    }
});

module.exports = router;