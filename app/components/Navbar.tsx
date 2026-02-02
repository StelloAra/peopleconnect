"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="w-full border-b bg-cyan">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / name */}
        <Link
          href="/"
          className="font-bold text-lg text-cyan-600 hover:text-cyan-800"
        >
          PeopleConnect
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
          <Link href="/users" className="text-cyan-600 hover:text-cyan-800">
            Users
          </Link>

          <Link href="/profile" className="text-cyan-600 hover:text-cyan-800">
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="text-cyan-600 hover:text-cyan-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
