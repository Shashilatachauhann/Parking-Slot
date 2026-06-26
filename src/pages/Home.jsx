import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

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

      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 items-center gap-16">

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F] text-sm font-semibold tracking-wide mb-6">
              ✨ Smart Parking Platform
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-950 leading-[1.15] tracking-tight">
              Find. Book. Park.
              <span className="block text-[#8B1E3F] mt-2">
                Made Simple.
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Reserve your parking spot in advance, avoid unnecessary waiting,
              and enjoy a seamless parking experience designed for modern cities.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-xl bg-[#8B1E3F] text-white font-semibold shadow-lg shadow-[#8B1E3F]/20 hover:bg-[#A61E4D] hover:shadow-xl hover:shadow-[#A61E4D]/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-xl border-2 border-[#8B1E3F]/20 text-[#8B1E3F] font-semibold hover:border-[#8B1E3F] hover:bg-[#8B1E3F]/5 transition-all duration-300"
              >
                Explore Slots
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200/60 flex gap-6 flex-wrap text-gray-700 text-sm font-medium">
              <p className="flex items-center gap-2">
                <span className="text-green-600 font-bold" aria-hidden="true">✔</span> Secure Booking
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600 font-bold" aria-hidden="true">✔</span> Real-Time Slots
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600 font-bold" aria-hidden="true">✔</span> Multiple Locations
              </p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-100 bg-[#8B1E3F]/15 rounded-full blur-[100px] -z-10"></div>

            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-4xl p-8 shadow-2xl shadow-gray-200/80 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <Link to="/" className="flex items-center gap-3">
                    <span className="border-[3px] border-[#550206] rounded-xl px-3 py-1 font-bold text-[#550206]"> P</span>
                    <div>
                      <h1 className="text-xl font-bold text-[#550206]"> ParkMate </h1>
                      <p className="text-[11px] tracking-[4px] text-gray-500">SMART PARK</p>
                    </div>
                  </Link>
                  <p className="mt-1 text-sm text-gray-400 font-medium tracking-wide">
                    LIVE HUB OVERVIEW
                  </p>
                </div>
                <span className="flex h-3 w-3 relative mt-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>

              <div className="mt-8 space-y-4 text-gray-700">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg px-2 transition-colors duration-200">
                  <span className="font-medium text-gray-600">🚗 Available Slots</span>
                  <span className="font-bold text-xl text-[#8B1E3F]">24</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg px-2 transition-colors duration-200">
                  <span className="font-medium text-gray-600">📍 System Locations</span>
                  <span className="font-bold text-xl text-[#8B1E3F]">8</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50/50 rounded-lg px-2 transition-colors duration-200">
                  <span className="font-medium text-gray-600">⚡ Bookings Today</span>
                  <span className="font-bold text-xl text-[#8B1E3F]">56</span>
                </div>

                <div className="flex justify-between items-center pt-3 px-2">
                  <span className="font-medium text-gray-600">🔒 System Security</span>
                  <span className="font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs border border-green-200/50">
                    Encrypted Active
                  </span>
                </div>
              </div>

              <Link
                to="/signup"
                className="block text-center mt-8 w-full py-4 rounded-xl bg-[#8B1E3F] text-white font-semibold shadow-md shadow-[#8B1E3F]/10 hover:bg-[#A61E4D] transform hover:-translate-y-0.5 transition-all duration-300"
              >
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
