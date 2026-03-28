"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

import Navbar from "./Navbar";
import NewItem from "./NewItem";
import ItemList from "./item-list";
import MealIdeas from "./MealIdeas";

import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  const loadItems = async () => {
    if (user) {
      const userItems = await getItems(user.uid);
      setItems(userItems);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);
      const itemWithId = { ...newItem, id: newItemId };
      setItems((prevItems) => [...prevItems, itemWithId]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
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

  if (!user) {
    return (
      <main className="bg-stone-100 min-h-screen p-10 flex flex-col justify-center items-center text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full">
          <p className="text-2xl text-slate-800 font-bold mb-4">
            Thank for shopping !!
          </p>
          <p className="text-slate-600">
            Please log in to view your shopping list.
          </p>
          <br />
          <button
            onClick={() => router.push("/week-10")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            &larr; Go to Login Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-stone-100 min-h-screen relative">
      <Navbar />

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
