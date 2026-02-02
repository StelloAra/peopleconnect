"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="relative flex flex-col items-center">
      {/* TOP RIGHT DROPDOWN */}
      <div className="absolute top-6 right-6">
        <Link
          href="/login"
          className="
      px-4 py-2
      rounded-lg
      border border-cyan-700
      text-cyan-700
      hover:border-cyan-500
      hover:text-cyan-500
      transition-colors
    "
        >
          Logga in
        </Link>
      </div>

      {/* HERO */}
      <section className="max-w-3xl text-center mt-32 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-600">
          Connecting people
        </h1>

        <p className="text-lg text-cyan-600 mb-6">
          PeopleConnect är en modern plattform för att möta nya människor och
          skapa meningsfulla kontakter. Enkelt, säkert och byggt för riktiga
          interaktioner.
        </p>

        <p className="text-cyan-600">
          Projektet är utvecklat som ett skolprojekt med fokus på modern
          webbutveckling, autentisering och användarupplevelse.
        </p>
      </section>

      {/* IMAGE */}
      <section
        className="w-full flex justify-center mt-6 -mb-20
 px-4"
      >
        <div className="w-full max-w-6xl h-[35vh] md:h-[70vh] rounded-xl overflow-hidden shadow-lg">
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
