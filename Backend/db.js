const users = []; 

let slots = [
    { id: "1", slotNumber: "A-01", venue: "Phoenix Palassio Mall", location: "Hazratganj", floor: "Basement 1", price: 50, isBooked: false },
    { id: "2", slotNumber: "A-02", venue: "Phoenix Palassio Mall", location: "Hazratganj", floor: "Basement 1", price: 60, isBooked: false },
    { id: "3", slotNumber: "B-05", venue: "Wave Mall", location: "Gomti Nagar", floor: "Ground Floor", price: 80, isBooked: true },
    { id: "4", slotNumber: "B-06", venue: "Wave Mall", location: "Gomti Nagar", floor: "Ground Floor", price: 75, isBooked: false },
    { id: "5", slotNumber: "C-12", venue: "Sahara Ganj Mall", location: "Aliganj", floor: "1st Floor", price: 100, isBooked: false },
    { id: "6", slotNumber: "C-13", venue: "Sahara Ganj Mall", location: "Aliganj", floor: "1st Floor", price: 90, isBooked: true },
    { id: "7", slotNumber: "D-01", venue: "City Railway Station Parking", location: "Indira Nagar", floor: "Open Lot", price: 45, isBooked: false }
];

const bookings = []; 
module.exports = { users, slots, bookings };