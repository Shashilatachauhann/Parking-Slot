import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ParkingSlots() {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([
    { id: "A1", location: "Lucknow Central", price: 50, status: "Available" },
    { id: "A2", location: "Lucknow Central", price: 50, status: "Available" },
    { id: "B4", location: "Hazratganj Hub", price: 80, status: "Available" },
  ]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("parkingSlots") || "[]");
    if (savedData.length > 0) {
      setSlots(savedData);
    }
  }, []);

  const handleBook = (slot) => {
    const newReservation = {
      id: "RES-" + Math.floor(Math.random() * 10000),
      location: slot.location,
      slot: slot.id,
      date: new Date().toLocaleDateString(),
      time: "Available Now",
      status: "Active",
      amount: "₹" + slot.price
    };

    const existing = JSON.parse(localStorage.getItem("reservations") || "[]");
    localStorage.setItem("reservations", JSON.stringify([...existing, newReservation]));

    alert("✅ Slot " + slot.id + " successfully booked!");
    navigate("/reservations");
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Available Parking Slots</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="text-xl font-bold">Slot {slot.name}</h3>

            <p className="text-gray-500">{slot.location}</p>
            <p className="text-2xl font-bold text-[#8B1E3F] my-4">{slot.price}</p>

            <button
              onClick={() => handleBook(slot)}
              className="w-full bg-[#8B1E3F] text-white py-3 rounded-xl font-bold hover:bg-[#A61E4D]"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}