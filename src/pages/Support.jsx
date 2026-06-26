export default function Support() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#8B1E3F] text-center">
        Support Center
      </h1>

      <p className="text-center text-gray-600 mt-3">
        We're here to help you with parking reservations and support.
      </p>

      {/* Contact Form */}
      <section className="mt-12 border rounded-lg p-6 shadow-sm">

        <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-5">
          Contact Us
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border rounded-lg p-3"
          ></textarea>

          <button
            className="bg-[#8B1E3F] text-white px-6 py-3 rounded-lg"
          >
            Send Message
          </button>

        </form>

      </section>

      {/* Contact Details */}
      <section className="mt-10 border rounded-lg p-6 shadow-sm">

        <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-5">
          Contact Details
        </h2>

        <p className="text-gray-700 mb-3">
          📞 Phone: +91 98765 43210
        </p>

        <p className="text-gray-700">
          📧 Email: support@parkmate.com
        </p>

      </section>

      {/* Parking Rules */}
      <section className="mt-10 border rounded-lg p-6 shadow-sm">

        <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-5">
          Parking Rules
        </h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">

          <li>Park only in your reserved slot.</li>

          <li>Follow parking time limits.</li>

          <li>Do not block other vehicles.</li>

          <li>Keep your parking ticket safe.</li>

          <li>Drive carefully inside the parking area.</li>

        </ul>

      </section>

      {/* Help & Support */}
      <section className="mt-10 border rounded-lg p-6 shadow-sm">

        <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-5">
          Help & Support
        </h2>

        <div className="space-y-3 text-gray-700">

          <p>✔ Book parking slots online.</p>

          <p>✔ Manage your reservations easily.</p>

          <p>✔ Check slot availability in real time.</p>

          <p>✔ Get assistance for booking issues.</p>

        </div>

      </section>

      {/* FAQs */}
      <section className="mt-10 border rounded-lg p-6 shadow-sm mb-10">

        <h2 className="text-2xl font-semibold text-[#8B1E3F] mb-5">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold text-black">
              How do I reserve a parking slot?
            </h3>

            <p className="text-gray-600">
              Go to Parking Slots and choose an available slot.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">
              Can I cancel my reservation?
            </h3>

            <p className="text-gray-600">
              Yes, reservations can be cancelled before the booking time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">
              How can I contact support?
            </h3>

            <p className="text-gray-600">
              You can use the contact form or call our support team.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}