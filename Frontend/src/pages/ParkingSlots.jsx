import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ParkingSlots() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //  fetching th edata from the slots.js(db.js)
  useEffect(() => {
    const timer = setTimeout(() => {
      const url = searchQuery
        ? `http://localhost:5000/api/slots?location=${searchQuery}`
        : 'http://localhost:5000/api/slots';

      fetch(url)
        .then(res => res.json())
        .then(data => setSlots(data))
        .catch(err => console.error("Error fetching slots:", err));
    }, 400); 
    //i used this because the data does not update at every letter 
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleBook = async (slot) => {
    const bookingData = {
      slotId: slot.id,
      slotNumber: slot.slotNumber,
      venue: slot.venue,
      location: slot.location,
      floor: slot.floor,
      price: slot.price,
      date: new Date().toLocaleDateString()
    };

    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    if (res.ok) {
      alert("✅ Slot " + slot.slotNumber + " Successfully booked!");
      navigate("/reservations");
    } else {
      alert("Error booking slot!");
    }
  };

  //  for searching the slots based on the location
  const filteredSlots = slots.filter((slot) =>
    slot.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black mb-6">Available Parking Slots</h1>

      <div className="mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] font-medium"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <div key={slot.id} className="bg-white p-6 rounded-3xl border shadow-sm">
              <h3 className="text-xl font-black">Slot {slot.slotNumber}</h3>
              <p className="text-gray-700 font-bold">{slot.venue}</p>
              <p className="text-gray-500 text-sm">{slot.location} · {slot.floor}</p>
              <p className="text-2xl font-black text-[#8B1E3F] my-4">₹{slot.price}</p>

              <button
                onClick={() => handleBook(slot)}
                disabled={slot.isBooked}
                className={`w-full py-3 rounded-xl font-bold ${slot.isBooked
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#8B1E3F] text-white hover:bg-[#A61E4D]"
                  }`}
              >
                {slot.isBooked ? "Occupied" : "Book Now"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 font-medium col-span-3 text-center py-10">
            No slots found for "{searchQuery}" Oops!
          </p>
        )}
      </div>
    </div>
  );
}
