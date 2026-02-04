export default function Item({ name, quantity, category }) {
  return (
    <li
      title={`Quantity: ${quantity}, Category: ${category}`}
      className="bg-white border-1 border-amber-900 p-4 w-96 rounded-lg shadow-md hover:scale-105 transition-transform my-2"
    >
      <h3 className="text-slate-900 text-xl font-bold">{name}</h3>
    </li>
  );
}
