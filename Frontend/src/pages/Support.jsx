import { useEffect, useState } from "react";
import { Mail, Phone, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Support() {
  const { role } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [venues, setVenues] = useState([]);
  const [venueId, setVenueId] = useState("");
  const [subject, setSubject] = useState("Booking Issue");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [myTickets, setMyTickets] = useState([]);

  const faqs = [
    { q: "How do I cancel my reservation?", a: "Go to your 'Reservations' tab, select the active booking, and click 'Cancel Booking'." },
    { q: "How do I add money to my wallet?", a: "Navigate to the Dashboard and use the wallet section to add funds." },
    { q: "What if I can't find my reserved slot?", a: "Please contact the venue admin using the form below, or check the parking hub number in your ticket." }
  ];
  useEffect(() => {
    api.get("/venues").then(({ data }) => setVenues(data)).catch(() => { });
    api.get("/support/mine").then(({ data }) => setMyTickets(data)).catch(() => { });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (role === "user" && !venueId) {
      return setStatus("Please select which venue your issue is about.");
    }
    try {
      const { data } = await api.post("/support", { venueId, subject, message });
      setMyTickets([data, ...myTickets]);
      setMessage("");
      setStatus("Your message has been sent!");
    } catch (err) {
      setStatus(err.response?.data?.message || "Could not send your message. Please try again.");
    }
  };

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
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><HelpCircle size={20} /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-semibold text-sm"
                >
                  {faq.q}
                  {openIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
        <form className="space-y-4" onSubmit={handleSubmit}>

          <select
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1E3F]/20"
          >
            <option value="">Select the venue this is about...</option>
            {venues.map((v) => (
              <option key={v._id} value={v._id}>{v.name} — {v.location}</option>
            ))}
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1E3F]/20"
          >
            <option>Booking Issue</option>
            <option>Payment Issue</option>
            <option>Slot Problem</option>
            <option>Other</option>
          </select>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            className="w-full h-32 p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#8B1E3F]/20"
          />

          {status && <p className="text-sm font-semibold text-[#8B1E3F]">{status}</p>}

          <button className="bg-[#8B1E3F] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#A61E4D]">Submit Ticket</button>
        </form>
      </div>

      {myTickets.length > 0 && (
        <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-xl mb-6">Your Tickets</h2>
          <div className="space-y-3">
            {myTickets.map((t) => (
              <div key={t._id} className="border border-gray-100 rounded-2xl p-4 flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{t.subject}</p>
                  <p className="text-sm text-gray-500 mt-1">{t.message}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                  t.status === "Resolved" ? "bg-green-100 text-green-700" :
                  t.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}