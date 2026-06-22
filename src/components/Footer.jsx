export default function Footer() {

  return (
    <footer className="border-t border-gray-300 mt-10">

      <div className="max-w-6xl mx-auto px-4 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-[#8B1E3F]">
              ParkMate
            </h2>

            <p className="mt-3 text-gray-600">
              Smart parking system for finding and booking parking slots.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B1E3F] mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-600">

              <li>
                <a href="/">Home</a>
              </li>

              <li>
                <a href="/slots">Parking Slots</a>
              </li>

              <li>
                <a href="/support">Support</a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#8B1E3F] mb-3">
              Contact
            </h3>

            <p className="text-gray-600">
              support@parkmate.com
            </p>

            <p className="text-gray-600 mt-2">
              +91 98765 43210
            </p>
          </div>

        </div>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-gray-500">
          © 2026 ParkMate. All Rights Reserved.
        </p>

      </div>

    </footer>

  );
}
