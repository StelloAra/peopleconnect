"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useRouter } from "next/navigation";

export default function ConversationPage() {
  const { userId } = useParams();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [otherUser, setOtherUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      setCurrentUser(user);

      const snap = await getDoc(doc(db, "users", userId as string));
      if (snap.exists()) {
        setOtherUser(snap.data());
      }
    });

    return () => unsub();
  }, [router, userId]);

  if (!currentUser || !otherUser) {
    return <p className="p-8">Laddar konversation...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold mb-8">Conversation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current user */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-2">Du</h2>
          <p>{currentUser.email}</p>
        </div>

        {/* Other user */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-2">{otherUser.name}</h2>
          <p>{otherUser.bio}</p>
        </div>
      </div>

      {/* Chat placeholder */}
      <div className="mt-12 border rounded-xl p-6 text-gray-500">
        Chatt kommer här…
      </div>
    </main>
  );
}
