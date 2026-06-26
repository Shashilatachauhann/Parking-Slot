export default function HowItWorks() {
  const steps = [
    {
      icon: "🔍",
      title: "Search Parking",
      desc: "Browse available parking spaces near your destination effortlessly."
    },
    {
      icon: "📍",
      title: "Select Spot",
      desc: "Choose the perfect slot based on real-time location and timing maps."
    },
    {
      icon: "💳",
      title: "Book Securely",
      desc: "Confirm your spot instantly with our encrypted fast payment system."
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block bg-[#8B1E3F]/10 text-[#8B1E3F] px-5 py-2 rounded-full font-bold text-xs tracking-wide uppercase">
            🚀 Easy Process
          </span>
          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Reserve your designated parking space seamlessly in just three intuitive steps.
          </p>
        </div>

   
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">

          <div className="hidden lg:block absolute top-24 left-[15%] w-[70%] h-0.5 bg-linear-to-r from-transparent via-[#8B1E3F]/20 to-transparent pointer-events-none" />

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group relative rounded-4xl bg-white p-8 border border-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#8B1E3F]/20 hover:shadow-xl hover:shadow-gray-200/60"
            >
              <div className="absolute right-8 top-8">
                <div className="h-10 w-10 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#8B1E3F]/20 transform transition-transform duration-500 group-hover:scale-110">
                  {index + 1}
                </div>
              </div>

              <div className="h-16 w-16 rounded-2xl bg-[#8B1E3F]/5 flex items-center justify-center text-3xl transition-all duration-500 group-hover:bg-[#8B1E3F]/10">
                {step.icon}
              </div>

              <h3 className="mt-8 text-xl font-bold text-gray-900 tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>

              <div className="mt-8 h-0.75 rounded-full bg-gray-100 overflow-hidden">
                <div className="w-0 h-full bg-[#8B1E3F] rounded-full transition-all duration-700 ease-out group-hover:w-full" />
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}