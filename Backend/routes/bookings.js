const express = require('express');
const router = express.Router();
const { bookings, slots } = require('../db');


router.get('/', (req, res) => {
    res.json(bookings);
});

//   creating a new booking
router.post('/', (req, res) => {
    const {slotNumber, slotId, location, price, date } = req.body;
    const newBooking = { 
        id: Date.now().toString(), 
        slotId, 
        slotNumber,
        location, 
        price, 
        date, 
        status: "Active" 
    };
    
    bookings.push(newBooking);

    const slot = slots.find(s => s.id === slotId);
    if (slot) {
        slot.isBooked = true;
    }

    res.status(201).json(newBooking);
});
//   used patch bcoz i had to show status changed not delete from array
router.patch('/:id/cancel', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found!" });
    }

    booking.status = "Cancelled";

    // here making  the slots available again
    const slot = slots.find(s => s.id === booking.slotId);
    if (slot) {
        slot.isBooked = false;
    }

    res.json({ message: "Booking cancelled successfully!", booking });
});

    // this is for admin to delete the booking permanently
router.delete('/:id', (req, res) => {
    const bookingIndex = bookings.findIndex(b => b.id === req.params.id);
    
    if (bookingIndex !== -1) {
        const booking = bookings[bookingIndex];
        
        // again making the slot available
        const slot = slots.find(s => s.id === booking.slotId);
        if (slot) {
            slot.isBooked = false;
        }

        //   remove the booking
        bookings.splice(bookingIndex, 1);
        
        res.json({ message: "Booking deleted successfully!" });
    } else {
        res.status(404).json({ message: "Booking not found!" });
    }
});

module.exports = router;