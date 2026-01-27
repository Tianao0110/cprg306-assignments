export default function GroceryItem({ name, quantity, category }) {
  return (
    <li className="bg-white border-1 border-amber-900 p-4 w-96 rounded-lg shadow-md hover:scale-105 transition-transform my-2">
      <h3 className="text-slate-900 text-xl font-bold">{name}</h3>

      <p className="text-sm text-gray-500 mt-2">Quantity: {quantity}</p>

      <p className="font-semibold text-amber-600 capitalize">
        Category: {category}
      </p>
    </li>
  );
}
