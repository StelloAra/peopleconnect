export default function Footer() {
  return (
    <footer className="w-full bg-black mt-24">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-cyan-700">
        {/* Project name */}
        <div>
          <h3 className="font-semibold text-lg mb-2">PeopleConnect</h3>
          <p className="text-sm">Ett projekt byggt med Next.js,</p>
          <p className="text-sm">TypeScript och Firebase.</p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Kontakt</h3>
          <p className="text-sm">Tel: 070-000 00 00</p>
          <p className="text-sm">Mail: info@peopleconnect.se</p>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Adress</h3>
          <p className="text-sm">PeopleConnect AB</p>
          <p className="text-sm">Exempelgatan 1</p>
          <p className="text-sm">123 45 Stockholm</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} PeopleConnect. All rights reserved.
      </div>
    </footer>
  );
}
