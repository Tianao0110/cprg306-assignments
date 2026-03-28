"use client";
import { useState } from "react";

export default function NewItem({ onAddItem, onClose }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const CATEGORIES = [
    "Produce",
    "Dairy",
    "Bakery",
    "Meat",
    "Frozen Foods",
    "Canned Goods",
    "Dry Goods",
    "Beverages",
    "Snacks",
    "Household",
    "Other",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const item = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      quantity,
      category,
    };

    onAddItem(item);
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white p-8 rounded-xl shadow-2xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">
        Add New Item
      </h2>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Item Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Milk"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Row for Quantity & Category */}
      <div className="flex gap-4">
        <div className="w-1/3">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max="99"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="w-2/3">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 capitalize"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="w-1/3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-2/3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors"
        >
          + Add
        </button>
      </div>
    </form>
  );
}
