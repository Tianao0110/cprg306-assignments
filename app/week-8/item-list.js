"use client";
import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect, onOpenModal }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const groupedItems = sortedItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedItems).sort();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium mr-2">Sort by:</span>
          <button
            onClick={() => setSortBy("name")}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              sortBy === "name"
                ? "bg-orange-500 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Name
          </button>
          <button
            onClick={() => setSortBy("category")}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              sortBy === "category"
                ? "bg-orange-500 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Category
          </button>
          <button
            onClick={() => setSortBy("group")}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              sortBy === "group"
                ? "bg-orange-500 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Grouped
          </button>
        </div>

        <button
          onClick={onOpenModal}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold shadow-md transition-all hover:scale-105 flex items-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Add Item
        </button>
      </div>

      {sortBy === "group" ? (
        <div className="flex flex-col gap-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-700 pb-1 capitalize">
                {category}
              </h3>

              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 capitalize">
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item key={item.id} {...item} onSelect={onItemSelect} />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sortedItems.map((item) => (
            <Item key={item.id} {...item} onSelect={onItemSelect} />
          ))}
        </ul>
      )}
    </div>
  );
}
