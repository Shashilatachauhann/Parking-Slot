# ParkMate - Smart Parking Slot Management System

ParkMate is a full-stack parking slot booking and management platform built with the MERN stack. Users can search for parking venues, book a slot for a specific time window, and get a QR code / PIN for gate entry. Venue admins get a dashboard to manage slots, view bookings, track revenue, and run gate check-in/check-out operations.

Built as a college major project to demonstrate a real-world, production-style booking system - role-based access, time-conflict-aware booking logic, dynamic peak-hour pricing, and an operational gate-control flow.

---

## Features

### For Users
- Sign up / log in with JWT-based authentication
- Browse parking venues and available slots (with map view)
- Book a slot for a specific date and time range, with real-time conflict detection
- Peak-hour dynamic pricing (higher rates during busy hours, applied automatically)
- Get a unique PIN and QR code per booking for gate entry
- View, track, and cancel reservations
- Raise support tickets to the venue admin

### For Venue Admins
- Admin dashboard with booking stats, revenue charts, and live-occupancy view
- Manage parking slots (add, edit, close/open, mark EV-charging slots)
- View and manage all bookings for their venue (mark completed / cancel)
- Gate Control - check vehicles in using their booking PIN, see a live "Currently Parked" list, and check them out (auto-frees the slot, flags overstays)
- Manage support tickets raised by users
- Manage users associated with the venue

---

## Tech Stack

Frontend: React (Vite), Tailwind CSS, React Router, Axios, Recharts / Chart.js, React-Leaflet (maps), Lucide Icons

Backend: Node.js, Express.js, MongoDB with Mongoose, JWT authentication, bcrypt.js (password hashing)

Other: QR code generation for gate entry, role-based access control (user / admin)

---

## Project Structure

```
parkmate/
  Backend/
    controllers/    Route logic (auth, bookings, slots, venues, stats, support)
    models/          Mongoose schemas (User, Booking, Slot, Venue, Support)
    routes/           Express route definitions
    middleware/  Auth middleware (protect, restrictTo)
    utils/               Helpers (pricing logic, PIN/QR generation, error handling)
    server.js

  Frontend/
    src/
      pages/           Route-level pages (Dashboard, Bookings, GateControl, etc.)
      components/ Reusable UI (Sidebar, Navbar, Footer, etc.)
      context/        Auth context
      api/               Axios instance
      App.jsx
    index.html
```

---

## Getting Started (Run Locally)

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database - either MongoDB Atlas (free tier, cloud) or a local MongoDB instance

### 1. Clone the repo
```
git clone <your-repo-url>
cd parkmate
```

### 2. Backend setup
```
cd Backend
npm install
```

Create a .env file inside Backend:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

Run the backend:
```
npm start
```
Server runs at http://localhost:5000

### 3. Frontend setup
Open a new terminal:
```
cd Frontend
npm install
npm run dev
```
App runs at http://localhost:5173

## Roadmap / Future Enhancements

- Real payment gateway integration (Razorpay)
- Dedicated guard role with restricted, gate-control-only access
- Email/SMS notifications for booking confirmation and reminders
- Ratings and reviews for parking venues
- Real-time slot availability using WebSockets

---

## License

This project was built for academic purposes as Summer Internship Project.
