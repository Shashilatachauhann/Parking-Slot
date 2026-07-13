import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LayoutDashboard, Package, Users, IndianRupee } from 'lucide-react';
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, bookings: 0, users: 0, available: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          api.get("/stats/venue"),
          api.get("/stats/venue/chart"),
        ]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
      } catch (err) {
        console.error("Backend connection failed:", err);
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-6 lg:p-10 font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Analytics</h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", val: `₹${stats.revenue}`, icon: IndianRupee },
          { title: "Bookings", val: stats.bookings, icon: Package },
          { title: "Users", val: stats.users, icon: Users },
          { title: "Free Slots", val: stats.available, icon: LayoutDashboard },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-slate-50 w-fit rounded-2xl mb-4"><card.icon size={24} className="text-[#8B1E3F]" /></div>
            <p className="text-slate-400 text-xs font-bold uppercase">{card.title}</p>
            <h3 className="text-2xl font-black mt-1">{card.val}</h3>
          </div>
        ))}
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-black mb-6">Revenue Trend</h3>
          {chartData.length === 0 ? (
              <p className="text-gray-400 text-sm">Not enough booking data yet to show a trend.</p>
          ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#8B1E3F" fill="#8B1E3F" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        )}
          
        </div>
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-black mb-6">Booking Volume</h3>
          {chartData.length === 0 ? (
            <p className="text-gray-400 text-sm">No bookings yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <Bar dataKey="bookings" fill="#2D3748" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
