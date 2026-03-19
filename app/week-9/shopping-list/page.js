"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

import NewItem from "./NewItem";
import ItemList from "./item-list";
import MealIdeas from "./MealIdeas";
import itemsData from "./items.json";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setIsModalOpen(false);
  };

  const handleItemSelect = (name) => {
    const cleanedName = name
      .split(",")[0]
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .trim();
    setSelectedItemName(cleanedName);
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  if (!user) {
    return (
      <main className="bg-stone-100 min-h-screen p-10 flex flex-col justify-center items-center text-center">
        <p className="text-2xl text-slate-800 font-bold mb-4">Sorry !!</p>
        <p className="text-slate-600">
          Please log in to view your shopping list.
        </p>
        <br />
        <button
          onClick={() => router.push("/week-9")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-md"
        >
          &larr; Go to Login Page
        </button>
      </main>
    );
  }

  return (
    <main className="bg-stone-100 min-h-screen relative">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* left:Logo & title */}
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-2xl"></span> Shopping List
          </h1>

          {/* right：user info. */}
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

      <div className="p-6 md:p-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
            <ItemList
              items={items}
              onItemSelect={handleItemSelect}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>

          <div className="w-full md:w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <NewItem
              onAddItem={handleAddItem}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
