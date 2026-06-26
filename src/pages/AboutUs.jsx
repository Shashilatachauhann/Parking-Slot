export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-8 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
        About <span className="text-[#8B1E3F]">ParkMate</span>
      </h1>
      
      <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
        <p>
          Welcome to <strong>ParkMate</strong>, your ultimate smart parking solution. We believe that finding a parking spot shouldn't be a hassle in today's fast-paced world.
        </p>
        
        <div className="bg-[#8B1E3F]/5 border-l-4 border-[#8B1E3F] p-6 rounded-r-2xl">
          <p className="font-semibold text-[#550206] italic">
            "Our mission is to declutter urban spaces and save your precious time by providing real-time parking availability at your fingertips."
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10">Why Choose Us?</h2>
        <ul className="grid md:grid-cols-2 gap-6 mt-4">
          {[
            { title: "Real-time Tracking", desc: "Know availability before you reach." },
            { title: "Secure Payments", desc: "Safe and encrypted transaction methods." },
            { title: "User Friendly", desc: "Clean interface designed for everyone." },
            { title: "24/7 Support", desc: "We are always here to help you." }
          ].map((item, i) => (
            <li key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#8B1E3F]">{item.title}</h3>
              <p className="text-sm mt-1">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}