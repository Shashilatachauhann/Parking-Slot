import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000, bookings: 24 },
  { name: 'Tue', revenue: 3000, bookings: 13 },
  { name: 'Wed', revenue: 6000, bookings: 38 },
  { name: 'Thu', revenue: 2780, bookings: 20 },
  { name: 'Fri', revenue: 8900, bookings: 45 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F8FA] p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 font-medium">Monitoring your parking ecosystem.</p>
        </div>
        <button onClick={() => window.location.href = "/manage-slots"} className="bg-[#8B1E3F] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#8B1E3F]/20 hover:scale-105 transition-transform">
          + Manage Slots
        </button>
      </div>

      {/* performance cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[{title: "Revenue", val: "₹45,200", trend: "+12%"}, {title: "Bookings", val: "142", trend: "+5%"}, {title: "Users", val: "1,284", trend: "+2%"}, {title: "Slots", val: "48", trend: "0%"}].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
            <p className="text-gray-400 text-sm font-bold uppercase">{card.title}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">{card.val}</h3>
            <span className="text-green-500 text-xs font-bold">{card.trend} vs last week</span>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#8B1E3F" fill="#8B1E3F" fillOpacity={0.1} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Booking Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f8f8fa'}} />
              <Bar dataKey="bookings" fill="#2D3748" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}