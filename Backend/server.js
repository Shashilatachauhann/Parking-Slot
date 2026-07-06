const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const signupRoutes = require('./routes/authSignup');
const loginRoutes = require('./routes/authLogin');
const slotRoutes = require('./routes/slots');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth/signup', signupRoutes);
app.use('/api/auth/login', loginRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);

//stats
app.get('/api/stats', (req, res) => {
    res.json({
        revenue: 45200,
        bookings: 142,
        users: 1284,
        available: 12
    });
});
//charts
app.get('/api/bookings/chart-data', (req, res) => {
    res.json([
        { name: 'Mon', revenue: 4000, bookings: 24 },
        { name: 'Tue', revenue: 3000, bookings: 13 },
    ]);
});

app.get('/', (req, res) => {
    res.send("ParkMate Backend is running perfectly!");
});

app.listen(5000, () => console.log("Server running on 5000..."));