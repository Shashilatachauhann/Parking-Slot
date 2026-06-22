import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

       
      <main className="max-w-5xl mx-auto px-4 pt-50 text-center">

        <h1 className="text-4xl md:text-6xl font-bold text-black">
          Smart Parking Made Easy
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
          Find available parking slots, reserve your parking space,
          and park without any hassle using ParkMate.
        </p>

        <div className="my-19">
          <Link
            to="/signup"
            className="inline-block px-8 py-3 rounded-lg bg-[#8B1E3F] text-white font-medium hover:bg-[#A61E4D]"
          >
            Get Started
          </Link>
        </div>

      </main>

           {/* About Parkmate */}
      <section className="max-w-6xl mx-auto px-4 py-16">

        <h2 className="text-3xl font-bold text-center mb-10 text-[#8B1E3F]">
          Why Choose ParkMate?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="border border-gray-300 rounded-sm p-6 shadow-lg shadow-red-950 hover:my-1">
            <h3 className="text-lg font-semibold text-[#8B1E3F] mb-2 ">
              Real-Time Slots
            </h3>

            <p className="text-gray-600">
              Check available parking spaces instantly.
            </p>
          </div>

          <div className="border border-gray-300 rounded-sm p-6 shadow-lg shadow-red-950 hover:my-1">
            <h3 className="text-lg font-semibold text-[#8B1E3F] mb-2">
              Easy Booking
            </h3>

            <p className="text-gray-600">
              Reserve your parking spot in just a few clicks.
            </p>
          </div>

          <div className="border border-gray-300 rounded-sm p-6 shadow-lg shadow-red-950 hover:my-1">
            <h3 className="text-lg font-semibold text-[#8B1E3F] mb-2">
              Smart Navigation
            </h3>

            <p className="text-gray-600">
              Get directions to your reserved parking location.
            </p>
          </div>

          <div className="border border-gray-300 rounded-sm p-6 shadow-lg shadow-red-950 hover:my-1">
            <h3 className="text-lg font-semibold text-[#8B1E3F] mb-2">
              Secure System
            </h3>

            <p className="text-gray-600">
              Safe and reliable parking reservations.
            </p>
          </div>

        </div>

      </section>

      <HowItWorks />
      <Footer />

    </div>
  );
}