"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart, FaCommentDots } from "react-icons/fa";

type UserProfile = {
  id: string;
  name: string;
  age: number;
  bio: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [likedUsers, setLikedUsers] = useState<string[]>([]);

  const toggleLike = (userId: string) => {
    setLikedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      const querySnapshot = await getDocs(collection(db, "users"));
      const list: UserProfile[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) {
          list.push({
            id: doc.id,
            ...(doc.data() as Omit<UserProfile, "id">),
          });
        }
      });

      setUsers(list);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <p className="p-8">Laddar användare...</p>;

  return (
    <main className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-8">Användare</h1>

      {users.length === 0 && (
        <p className="text-gray-500">Inga andra användare ännu.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">
                {user.name}, {user.age}
              </h2>

              <p className="text-gray-600 mt-2">
                {user.bio || "Ingen bio angiven."}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-6 mt-4 text-xl">
              {/* LIKE */}
              <button onClick={() => toggleLike(user.id)}>
                {likedUsers.includes(user.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-400" />
                )}
              </button>

              {/* MESSAGE */}
              <button
                onClick={() => router.push(`/conversations/${user.id}`)}
                className="text-gray-400 hover:text-blue-500"
              >
                <FaCommentDots />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
