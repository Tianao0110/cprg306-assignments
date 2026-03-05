export default function Item({ name, quantity, category }) {
  return (
    <li className="bg-white border border-gray-200 p-4 w-96 rounded-lg shadow-sm hover:shadow-md transition-shadow my-2">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>

      <div className="text-gray-600 text-sm space-y-1">
        <p>
          Quantity:{" "}
          <span className="font-semibold text-slate-800">{quantity}</span>
        </p>
        <p className="capitalize">
          Category:{" "}
          <span className="font-semibold text-amber-600">{category}</span>
        </p>
      </div>
    </li>
  );
}
