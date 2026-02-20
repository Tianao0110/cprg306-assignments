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
      </div>
    </main>
  );
}
