import { useState } from "react";
import { Mail, Phone, MessageSquare, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How do I cancel my reservation?", a: "Go to your 'Reservations' tab, select the active booking, and click 'Cancel Booking'. The refund will be credited to your wallet instantly." },
    { q: "How do I add money to my wallet?", a: "Navigate to the Dashboard, click on '+ Add Money' button, select your payment method, and complete the transaction." },
    { q: "What if I can't find my reserved slot?", a: "Please contact our on-site support team via the 'Call Support' button below or check the parking hub number in your ticket." }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">How can we help you?</h1>
        <p className="text-gray-500 mt-2">Find answers, get support, or contact us directly.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#8B1E3F]/30 transition-colors cursor-pointer">
            <div className="bg-[#8B1E3F]/10 p-3 rounded-xl text-[#8B1E3F]"><Phone /></div>
            <div>
              <p className="font-bold text-gray-900">Call Support</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#8B1E3F]/30 transition-colors cursor-pointer">
            <div className="bg-[#8B1E3F]/10 p-3 rounded-xl text-[#8B1E3F]"><Mail /></div>
            <div>
              <p className="font-bold text-gray-900">Email Us</p>
              <p className="text-sm text-gray-500">support@parkmate.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><HelpCircle size={20}/> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-semibold text-sm"
                >
                  {faq.q}
                  {openIndex === index ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {openIndex === index && (
                  <div className="p-4 text-sm text-gray-600 bg-white border-t border-gray-100">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="font-bold text-xl mb-6">Send us a message</h2>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
          <textarea 
            placeholder="Describe your issue..." 
            className="w-full h-32 p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1E3F]/20"
          ></textarea>
          <button className="bg-[#8B1E3F] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#A61E4D]">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
}