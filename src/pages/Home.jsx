import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#FAFAFA]">


      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 items-center gap-16">


          {/* Left */}

          <div>

            <span className="px-4 py-2 rounded-full bg-[#8B1E3F]/10 text-[#8B1E3F] text-sm font-semibold">

              Smart Parking Platform

            </span>



            <h1 className="mt-8 text-5xl lg:text-7xl font-bold leading-tight">

              Find. Book. Park.


              <span className="block text-[#8B1E3F]">

                Made Simple.

              </span>

            </h1>



            <p className="mt-6 text-lg text-gray-600 leading-8">

              Reserve your parking spot in advance,
              avoid unnecessary waiting,
              and enjoy a seamless parking experience
              designed for modern cities.


            </p>




            <div className="mt-10 flex gap-5 flex-wrap">

              <Link


                to="/signup"

                className="px-8 py-4 rounded-xl bg-[#8B1E3F] text-white font-semibold hover:bg-[#A61E4D] transition"

              >

                Get Started

              </Link>



              <Link


                to="/slots"


                className="px-8 py-4 rounded-xl border border-[#8B1E3F] text-[#8B1E3F] font-semibold hover:bg-[#8B1E3F] hover:text-white transition"

              >

                Explore

              </Link>

            </div>





            <div className="mt-12 flex gap-8 flex-wrap">


              <p className="font-medium">

                ✔ Secure Booking

              </p>


              <p className="font-medium">

                ✔ Real-Time Slots

              </p>


              <p className="font-medium">

                ✔ Multiple Locations

              </p>


            </div>



          </div>







          {/* Right */}


          <div className="relative">


            <div className="absolute h-72 w-72 bg-[#8B1E3F]/10 rounded-full blur-3xl"></div>



            <div className="relative z-10 bg-white rounded-[40px] p-10 shadow-2xl border border-[#8B1E3F]/10">


              <h2 className="text-4xl font-bold text-[#8B1E3F]">

                ParkMate

              </h2>


              <p className="mt-2 text-gray-500">

                Smart Parking Solution

              </p>




              <div className="mt-10 space-y-6">



                <div className="flex justify-between">

                  <span>

                    🚗 Available Slots

                  </span>


                  <span className="font-bold text-[#8B1E3F]">

                    24

                  </span>


                </div>





                <div className="flex justify-between">

                  <span>

                    📍 Locations

                  </span>


                  <span className="font-bold text-[#8B1E3F]">

                    8

                  </span>


                </div>






                <div className="flex justify-between">

                  <span>

                    ⚡ Bookings Today

                  </span>


                  <span className="font-bold text-[#8B1E3F]">

                    56

                  </span>


                </div>






                <div className="flex justify-between">

                  <span>

                    🔒 Security

                  </span>


                  <span className="font-bold text-green-600">

                    Active

                  </span>


                </div>



              </div>





              <button className="mt-10 w-full py-3 rounded-xl bg-[#8B1E3F] text-white font-semibold hover:bg-[#A61E4D] transition">

                Reserve Spot

              </button>


            </div>



          </div>



        </div>

      </section>






      {/* Why Choose Us */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center">

          Why Choose ParkMate?

        </h2>



        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">


          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition">

            <h3 className="text-xl font-semibold">

              🚗 Real-Time Slots

            </h3>


            <p className="mt-3 text-gray-500">

              Instantly check available parking.

            </p>

          </div>





          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition">

            <h3 className="text-xl font-semibold">

              ⚡ Fast Booking

            </h3>


            <p className="mt-3 text-gray-500">

              Book your spot within seconds.

            </p>

          </div>





          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition">

            <h3 className="text-xl font-semibold">

              📍 Smart Navigation

            </h3>


            <p className="mt-3 text-gray-500">

              Reach your parking location easily.

            </p>

          </div>






          <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition">

            <h3 className="text-xl font-semibold">

              🔒 Secure Access

            </h3>


            <p className="mt-3 text-gray-500">

              Reliable and protected reservations.

            </p>

          </div>



        </div>


      </section>





      <HowItWorks />

      <Footer />



    </div>
  );
}