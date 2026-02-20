"use client";
import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center gap-4 mb-4">
        
        <span className="text-black font-medium">Sort by:</span>

        {/* Name */}
        <button
          onClick={() => setSortBy("name")} 
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            sortBy === "name" 
              ? "bg-orange-500 text-white shadow-md"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600" 
          }`}
        >
          Name
        </button>

        {/* Category */}
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            sortBy === "category" 
              ? "bg-orange-500 text-white shadow-md" 
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Category
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {sortedItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}