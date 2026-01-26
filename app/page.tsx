"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center">
      {/* TOP RIGHT DROPDOWN */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 rounded-lg border border-cyan-700 text-cyan-700 hover:bg-gray-700 transition"
        >
          Konto
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-cyan-700 border rounded-lg shadow-lg">
            <Link
              href="/login"
              className="block px-4 py-2 hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Logga in
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Skapa konto
            </Link>
          </div>
        )}
      </div>

      {/* HERO */}
      <section className="max-w-3xl text-center mt-32 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Connecting people
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          PeopleConnect är en modern plattform för att möta nya människor och
          skapa meningsfulla kontakter. Enkelt, säkert och byggt för riktiga
          interaktioner.
        </p>

        <p className="text-gray-500">
          Projektet är utvecklat som ett skolprojekt med fokus på modern
          webbutveckling, autentisering och användarupplevelse.
        </p>
      </section>

      {/* IMAGE */}
      <section className="w-full flex justify-center my-10">
        <div className="w-full max-w-6xl h-[40vh] md:h-[80vh] rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/people-connecting.jpg"
            alt="People connecting"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
