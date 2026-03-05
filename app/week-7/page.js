"use client";
import { useState } from "react";
import NewItem from "./NewItem";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="bg-stone-100 min-h-screen p-4">
      <div className="max-w-sm w-full mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          Shopping List
        </h1>

        <div className="mb-8">
          <NewItem onAddItem={handleAddItem} />
        </div>

        <ItemList items={items} />

        <div className="mt-16 border-t border-slate-700 pt-8">
          <h2 className="text-2xl font-bold text-balck mb-4">Wireframe</h2>
          <p className="text-slate-400 mb-4">
            This is the planned design for the Shopping List application.
          </p>

          <img
            src="/wireframe.png"
            alt="Wireframe of the Shopping List App"
            className="w-full rounded-lg border-2 border-slate-700 shadow-lg opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        {/* ------------------------------------------- */}
      </div>
    </main>
  );
}
