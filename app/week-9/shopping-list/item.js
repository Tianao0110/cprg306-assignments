export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={() => onSelect(name)}
      className="bg-white border border-gray-200 p-3 w-full aspect-square rounded-xl shadow-sm hover:shadow-md hover:border-orange-400 hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between items-center text-center overflow-hidden"
    >
      <div className="flex-1 flex items-center justify-center w-full px-1">
        <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-3 wrap-break-word capitalize ">
          {name}
        </h3>
      </div>

      <p className="text-sm font-bold text-amber-600 capitalize mb-2">
        {category}
      </p>

      <div className="bg-slate-100 px-2 py-1 rounded text-xs font-semibold text-slate-700 w-full truncate">
        Quantity: {quantity}
      </div>
    </li>
  );
}
