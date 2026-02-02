"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        // SKAPA KONTO
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/profile");
      } else {
        // LOGGA IN
        const result = await signInWithEmailAndPassword(auth, email, password);

        const user = result.user;
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          router.push("/users");
        } else {
          router.push("/profile");
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Skapa konto" : "Logga in"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
          >
            {isSignup ? "Skapa konto" : "Logga in"}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>

        <div className="mt-6 text-center text-sm">
          {isSignup ? (
            <p>
              Har du redan ett konto?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-cyan-600 hover:underline"
              >
                Logga in
              </button>
            </p>
          ) : (
            <p>
              Har du inget konto?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-cyan-600 hover:underline"
              >
                Skapa konto
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
