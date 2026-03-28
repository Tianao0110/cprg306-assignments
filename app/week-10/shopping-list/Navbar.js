"use client";
import { useUserAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user, firebaseSignOut } = useUserAuth();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out");
    }
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="text-2xl">🛒</span> Shopping List
        </h1>
        <div className="flex items-center gap-3 bg-stone-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm w-fit shrink-0">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="w-7 h-7 rounded-full border border-slate-300 object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
              {user.email ? user.email[0].toUpperCase() : "U"}
            </div>
          )}
          <span className="text-sm font-semibold text-slate-700 hidden sm:block">
            {user.displayName || user.email}
          </span>
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <button
            onClick={handleSignOut}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
