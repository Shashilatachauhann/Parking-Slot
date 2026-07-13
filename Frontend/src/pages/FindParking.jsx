import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function FindParking() {
  const navigate = useNavigate();
    const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api
      .get("/venues")
      .then(({ data }) => setVenues(data))
      .catch((err) => console.error("Error fetching venues:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 md:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Explore Parking Locations</h1>
        <p className="text-gray-500 mt-3">Find the best spot near you. Sign in to reserve your space.</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 font-bold">Loading venues...</p>
      ) : venues.length === 0 ? (
        <p className="text-center text-gray-400 font-bold py-10">No venues have been added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {venues.map((venue) => (
            <div key={venue._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-[#8B1E3F]/30 transition-all">
            <div>
              <h3 className="font-bold text-xl text-gray-900">{venue.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{venue.location}</p>
              <div className="flex gap-4 mt-4">
                <span className="text-sm font-semibold text-[#8B1E3F]">📍 {venue.capacity} Slots</span>
                
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl font-bold hover:bg-red-900 transition-all"
            >
              Check Slots
            </button>
          </div>
        ))}
        </div>
      )}
      </div>
  );
}