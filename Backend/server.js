const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes ko import karo
const signupRoutes = require('./routes/authSignup');
const loginRoutes = require('./routes/authLogin');

// Routes ko use karo
app.use('/api/auth/signup', signupRoutes);
app.use('/api/auth/login', loginRoutes);

app.get('/', (req, res) => {
    res.send("ParkMate Backend is running perfectly!");
});

app.listen(5000, () => console.log("Server running on 5000..."));