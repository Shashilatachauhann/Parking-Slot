import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import CarBg from '../assets/CarBg.png';

const features = [
  {
    icon: "🚗",
    title: "Real-Time Slots",
    description: "Instantly check available layout coordinates directly on your dashboard.",
  },
  {
    icon: "⚡",
    title: "Fast Booking",
    description: "Secure your customized perimeter parking code space within seconds.",
  },
  {
    icon: "📍",
    title: "Smart Navigation",
    description: "Integrated system mapping directions directly to your assigned zone.",
  },
  {
    icon: "🔒",
    title: "Secure Access",
    description: "Highly monitored reservation protocols protecting transaction layers.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen font-sans overflow-hidden">

      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${CarBg})` }}
        >
          <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-[2px]"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 items-center gap-16">

          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#8B1E3F]/50 text-white border border-[#8B1E3F] text-sm font-semibold tracking-wide mb-6">
              ✨ Smart Parking Platform
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight">
              Find. Book. Park.
              <span className="block text-[#FF4D6D] mt-2">Made Simple.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-xl">
              Reserve your parking spot in advance, avoid unnecessary waiting,
              and enjoy a seamless parking experience designed for modern cities.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link to="/signup" className="px-8 py-4 rounded-xl bg-[#8B1E3F] text-white font-semibold shadow-lg hover:bg-[#A61E4D] transition-all duration-300">
                Get Started
              </Link>
              <Link to="/login" className="px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                Explore Slots
              </Link>
            </div>
          </div>

          {/* Right Side Card (Glassmorphism) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-4xl p-8 shadow-2xl border border-white/20">
              <div className="flex justify-between items-start mb-8">
                <Link to="/" className="flex items-center gap-3">
                  <span className="border-[3px] border-white rounded-xl px-3 py-1 font-bold text-white"> P</span>
                  <div>
                    <h1 className="text-xl font-bold text-white"> ParkMate </h1>
                    <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
                  </div>
                </Link>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>

              <div className="space-y-4 text-white">
                {['Available Slots: 24', 'System Locations: 8', 'Bookings Today: 56'].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="font-medium text-gray-200">{item.split(':')[0]}</span>
                    <span className="font-bold text-xl text-[#FF4D6D]">{item.split(':')[1]}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3">
                  <span className="text-gray-200">System Security</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-500/50">Encrypted Active</span>
                </div>
              </div>

              <Link to="/signup" className="block text-center mt-8 w-full py-4 rounded-xl bg-[#8B1E3F] text-white font-semibold hover:bg-[#A61E4D] transition-all">
                Reserve Spot Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-950 tracking-tight">
            Why Choose ParkMate?
          </h2>
          <p className="mt-3 text-gray-500">
            We simplify urban parking ecosystems through advanced structural logistics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#8B1E3F]/30 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-2xl mb-4 bg-gray-50 h-12 w-12 rounded-xl flex items-center justify-center group-hover:bg-[#8B1E3F]/10 transition-colors duration-300" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <HowItWorks />
      <Footer />

    </main>
  );
}
