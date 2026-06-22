export default function HowItWorks() 
{
return (
   <section className="max-w-6xl mx-auto px-4 py-16">

  <h2 className="text-3xl font-bold text-center text-[#8B1E3F] mb-4">
    How It Works
  </h2>

  <p className="text-center text-gray-600 mb-10">
    Follow these simple steps to reserve your parking spot.
  </p>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="border border-gray-300 rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:shadow-red-950 hover:my-1">
      <div className="text-4xl mb-3">🔍</div>

      <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">
        Search Parking
      </h3>

      <p className="text-gray-600">
        Find parking spots near your destination.
      </p>
    </div>

    <div className="border border-gray-300 rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:shadow-red-950 hover:my-1">
      <div className="text-4xl mb-3">📍</div>

      <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">
        Select Spot
      </h3>

      <p className="text-gray-600">
        Choose an available parking slot.
      </p>
    </div>

    <div className="border border-gray-300 rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:shadow-red-950 hover:my-1">
      <div className="text-4xl mb-3">💳</div>

      <h3 className="text-xl font-semibold text-[#8B1E3F] mb-2">
        Book & Pay
      </h3>

      <p className="text-gray-600">
        Reserve your parking spot and pay online.
      </p>
    </div>

  </div>

</section>


);
}
