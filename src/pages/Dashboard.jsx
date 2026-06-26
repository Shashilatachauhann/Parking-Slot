import AuthLayout from "../components/AuthLayout";

export default function Dashboard() {

  const username =
    localStorage.getItem("username") || "Shashi";

  return (

    <AuthLayout>

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-bold">

          Welcome Back,

          <span className="text-[#8B1E3F] ml-2">

            {username} 👋

          </span>

        </h1>

        <p className="text-gray-500 mt-2">

          Here's what's happening today.

        </p>

      </div>



      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">


        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500">

            Available Slots

          </h3>

          <p className="mt-2 text-4xl font-bold text-[#8B1E3F]">

            24

          </p>

        </div>



        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500">

            Today's Bookings

          </h3>

          <p className="mt-2 text-4xl font-bold text-[#8B1E3F]">

            5

          </p>

        </div>



        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500">

            Reservations

          </h3>

          <p className="mt-2 text-4xl font-bold text-[#8B1E3F]">

            2

          </p>

        </div>


      </div>



      {/* Recent Reservations */}

      <div className="bg-white rounded-3xl p-6 shadow-sm mt-10">

        <h2 className="text-xl font-semibold">

          Recent Reservations

        </h2>


        <p className="text-gray-500 mt-4">

          No reservations found.

        </p>


      </div>


    </AuthLayout>

  );

}