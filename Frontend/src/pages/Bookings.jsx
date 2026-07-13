import { useState, useEffect, useMemo } from "react";
import { Clock, CheckCircle, XCircle, Search, TrendingUp, CalendarCheck } from "lucide-react";
import api from "../api/axios";

const STATUS_FILTERS = ["All", "Active", "Completed", "Cancelled"];
const todayStr = () => new Date().toISOString().split("T")[0];

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("live");
  const today = todayStr();
  const currentHour = new Date().getHours();

  const loadBookings = () => {
    api
      .get("/bookings/venue")
      .then(({ data }) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status: newStatus });
      setBookings(bookings.map((b) => (b._id === id ? { ...b, status: newStatus, cancelledBy: newStatus === "Cancelled" ? "admin" : b.cancelledBy } : b)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update this booking. Please try again.");
      console.error("Failed to update booking:", err);
    }
  };
  const isLiveNow = (b) =>
    b.status === "Active" && b.date === today && currentHour >= b.startHour && currentHour < b.endHour;
  const todaysBookings = bookings.filter((b) => b.date === today);
  const todaysRevenue = todaysBookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + b.finalPrice, 0);
  const liveCount = bookings.filter(isLiveNow).length;

  const visibleBookings = useMemo(() => {
    let result = bookings;

    if (statusFilter !== "All") {
      result = result.filter((b) => b.status === statusFilter);
    }

    if (dateFilter === "today") {
      result = result.filter((b) => b.date === today);
    } else if (dateFilter !== "all") {
      result = result.filter((b) => b.date === dateFilter); // specific date picked
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) => b.user?.name?.toLowerCase().includes(q) || b.slot?.slotNumber?.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "live") {
        const liveDiff = Number(isLiveNow(b)) - Number(isLiveNow(a));
        if (liveDiff !== 0) return liveDiff;
        return new Date(b.createdAt) - new Date(a.createdAt); // then newest first
      }
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt); // "newest"
    });

    return result;
  }, [bookings, statusFilter, dateFilter, search, sortBy, today]);

  if (loading) return <p className="p-8 text-gray-500">Loading bookings...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-6">Bookings</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
          <div className="bg-[#8B1E3F]/10 p-2.5 rounded-xl text-[#8B1E3F]"><CalendarCheck size={20} /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Today's Bookings</p>
            <p className="text-xl font-black">{todaysBookings.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
          <div className="bg-green-50 p-2.5 rounded-xl text-green-600"><TrendingUp size={20} /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Today's Revenue</p>
            <p className="text-xl font-black">₹{todaysRevenue}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
          <div className="relative bg-red-50 p-2.5 rounded-xl text-red-600">
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <CalendarCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Live Right Now</p>
            <p className="text-xl font-black">{liveCount}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                statusFilter === f ? "bg-[#8B1E3F] text-white" : "bg-white text-gray-500 border border-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex gap-2 md:ml-auto flex-wrap">
          <select
            value={dateFilter === "all" || dateFilter === "today" ? dateFilter : "custom"}
            onChange={(e) => setDateFilter(e.target.value === "custom" ? today : e.target.value)}
            className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none bg-white"
          >
            <option value="all">All Dates</option>
            <option value="today">Today Only</option>
            <option value="custom">Pick a date...</option>
          </select>

          {dateFilter !== "all" && dateFilter !== "today" && (
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none bg-white"
            />
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none bg-white"
          >
            <option value="live">Live Now First</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={16} />
        <input
          placeholder="Search by user name or slot number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B1E3F] text-sm font-medium bg-white"
        />
      </div>

      <div className="bg-white rounded-4xl border overflow-hidden">
        {visibleBookings.length === 0 ? (
          <p className="p-6 text-gray-500">No bookings match your filters.</p>
        ) : (
          visibleBookings.map((b) => {
            const live = isLiveNow(b);
            return (
              <div
                key={b._id}
                className={`flex justify-between items-center p-6 border-b last:border-b-0 ${live ? "bg-green-50/60" : ""}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{b.user?.name || "Unknown user"}</p>
                    {live && (
                      <span className="flex items-center gap-1 bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE NOW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Slot: {b.slot?.slotNumber} • {b.date} • {b.startHour}:00–{b.endHour}:00 • ₹{b.finalPrice}
                  </p>
                  {b.status === "Cancelled" && (
                    <p className="text-xs font-bold text-red-500 mt-1">
                      Cancelled by {b.cancelledBy === "user" ? "the user" : "admin"}
                    </p>
                  )}
                </div>
                {b.status === "Active" && (
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(b._id, "Completed")} className="bg-green-100 text-green-700 p-3 rounded-xl"><CheckCircle size={20} /></button>
                    <button onClick={() => updateStatus(b._id, "Cancelled")} className="bg-red-100 text-red-700 p-3 rounded-xl"><XCircle size={20} /></button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}