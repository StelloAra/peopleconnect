"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      // Vänta tills auth är klar
      if (currentUser === null) {
        setLoading(false);
        router.push("/login");
        return;
      }

      setUser(currentUser);

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setAge(data.age?.toString() || "");
        setBio(data.bio || "");
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    await setDoc(doc(db, "users", user.uid), {
      name,
      age: Number(age),
      bio,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    router.push("/users");
  };

  if (loading) return <p className="p-8">Laddar...</p>;

  return (
    <main className="max-w-md mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Min profil</h1>

      <form onSubmit={saveProfile} className="space-y-4">
        <input
          type="text"
          placeholder="Namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          type="number"
          placeholder="Ålder"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <textarea
          placeholder="Kort bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700"
        >
          Spara profil
        </button>
      </form>
    </main>
  );
}
