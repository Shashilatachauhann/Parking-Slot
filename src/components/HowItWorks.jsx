export default function HowItWorks() {

    const steps = [
        {
            icon: "🔍",
            title: "Search Parking",
            desc: "Browse available parking spaces near your destination."
        },

        {
            icon: "📍",
            title: "Select Spot",
            desc: "Choose the perfect slot based on location and timing."
        },

        {
            icon: "💳",
            title: "Book Securely",
            desc: "Confirm your reservation with a fast and secure payment."
        }
    ];

    return (
        <section className="py-28 bg-[#FAFAFA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <span className="bg-[#8B1E3F]/10 text-[#8B1E3F] px-5 py-2 rounded-full font-semibold text-sm">Easy Process</span>
                    <h2 className="mt-5 text-5xl font-bold text-black">How It Works</h2>
                    <p className="mt-5 text-gray-500 max-w-xl mx-auto">
                        Reserve your parking space effortlessly in just three simple steps.</p>
                </div>
                <div className="mt-20 grid lg:grid-cols-3 gap-8 relative">

                    {/* Connector */}
                    <div className="hidden lg:block absolute top-28 left-[22%] w-[56%] h-0.5 bg-[#8B1E3F]/10" />
                    {steps.map((step, index) => (
                        <div key={index} className="group relative rounded-[35px] bg-white p-10 border border-[#8B1E3F]/10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all
        duration-500 hover:-translate-y-3 hover:border-[#8B1E3F]/30 hover:shadow-[0_25px_60px_rgba(139,30,63,0.12)]">
                            <div className="absolute right-8 top-8">
                                <div className="h-12 w-12 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center font-bold">{index + 1}</div>
                            </div>
                            <div className="h-20 w-20 rounded-3xl bg-[#8B1E3F]/10 flex items-center justify-center text-4xl">{step.icon}</div>
                            <h3 className="mt-8 text-2xl font-bold text-black">{step.title}</h3>
                            <p className="mt-4 leading-8 text-gray-500">{step.desc}</p>
                            <div className="mt-8 h-1 rounded-full bg-gray-100 overflow-hidden">
                                <div className="w-0 h-full bg-[#8B1E3F] transition-all duration-500 group-hover:w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )

}