import ItemList from "./item-list.js";

export default function Page() {
  return (
    <main className="bg-stone-100 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping List</h1>
      {}
      <ItemList />
    </main>
  );
}
