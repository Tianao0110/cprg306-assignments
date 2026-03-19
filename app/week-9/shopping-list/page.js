"use client";
import { useState } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import NewItem from "./NewItem";
import ItemList from "./item-list";
import MealIdeas from "./MealIdeas";
import itemsData from "./items.json";

export default function Page() {
  const { user } = useUserAuth();
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

  if (!user) {
    return (
      <main className="bg-stone-100 min-h-screen p-10 flex flex-col justify-center items-center">
        <p className="text-2xl text-slate-800 font-bold mb-4">Sorry</p>
        <p className="text-slate-600">
          Please log in to view your shopping list.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-stone-100 min-h-screen p-6 md:p-10 relative">
      <h1 className="text-4xl font-bold text-black mb-8 text-center">
        Shopping List Dashboard
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 bg-stone-100 p-6 rounded-xl border border-slate-800 shadow-xl min-h-500px">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
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
