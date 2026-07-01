import { useNavigate } from "react-router-dom";

export default function FindParking() {
  const navigate = useNavigate();
  
  const locations = [
    { name: "Hazratganj Main Plaza", address: "Hazratganj, Lucknow", capacity: "50+ Slots", rate: "₹40/hr" },
    { name: "Charbagh Station Hub", address: "Station Road, Lucknow", capacity: "120+ Slots", rate: "₹30/hr" },
    { name: "Gomti Nagar IT Park", address: "Vibhuti Khand, Lucknow", capacity: "80+ Slots", rate: "₹50/hr" },
    { name: "Aminabad Market", address: "Aminabad, Lucknow", capacity: "30+ Slots", rate: "₹35/hr" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Explore Parking Locations</h1>
        <p className="text-gray-500 mt-3">Find the best spot near you. Sign in to reserve your space.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {locations.map((loc, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center hover:border-[#8B1E3F]/30 transition-all">
            <div>
              <h3 className="font-bold text-xl text-gray-900">{loc.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{loc.address}</p>
              <div className="flex gap-4 mt-4">
                <span className="text-sm font-semibold text-[#8B1E3F]">📍 {loc.capacity}</span>
                <span className="text-sm font-semibold text-gray-700">💰 {loc.rate}</span>
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
    </div>
  );
}