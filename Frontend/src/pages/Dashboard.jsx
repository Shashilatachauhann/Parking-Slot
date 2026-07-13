import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    api.get("/bookings/mine")
      .then(({ data }) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
    api.get("/venues")
      .then(({ data }) => setVenues(data))
      .catch((err) => console.error("Error fetching venues:", err));
  }, []);
  const active = bookings.filter(res => res.status === "Active");



  return (
    <div className="w-full animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back!
            <span className="text-[#8B1E3F] ml-3">{user?.name}</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
           Manage your slots below.
          </p>
        </div>

        <Link
          to="/slots"
          className="group px-6 py-3 bg-[#8B1E3F] text-white rounded-2xl font-bold hover:bg-[#A61E4D] transition-all duration-300 shadow-lg shadow-[#8B1E3F]/20 flex items-center gap-2"
        >
          <span>Find A Slot</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="space-y-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-600 font-semibold mb-4">My Active Reservation</h3>
            {active.length > 0 ? (
              active.map(res => (
                <div key={res.id} className="bg-[#8B1E3F]/5 rounded-2xl p-5 border border-[#8B1E3F]/10">
                  <p className="font-bold text-[#8B1E3F]">📍 {res.venue?.name}</p>
                  <p className="text-sm text-gray-600 mt-1">🚗 Slot: <span className="font-bold text-gray-900">{res.slot?.slotNumber}</span></p>
                  <p className="text-xs text-gray-400 mt-2 font-medium">{res.date} • {res.startHour}:00–{res.endHour}:00 • ₹{res.finalPrice}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400 italic">No active reservations.</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-gray-600 font-semibold mb-4">Live Parking Locations</h3>
          <div className="h-64 w-full rounded-2xl overflow-hidden border border-gray-200">
            <MapContainer
              center={[26.8467, 80.9462]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {venues.filter(v => v.coordinates?.lat && v.coordinates?.lng).map((v) => (
                <Marker key={v._id} position={[v.coordinates.lat, v.coordinates.lng]}>
                  <Popup>{v.name}<br />{v.location}</Popup>
                </Marker>
              ))}
              {venues.filter(v => v.coordinates?.lat && v.coordinates?.lng).length === 0 && (
                <Marker position={[26.8467, 80.9462]}>
                  <Popup>Lucknow Central Hub<br />Add coordinates to venues to see them here</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
}