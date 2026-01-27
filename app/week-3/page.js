import GroceryItemList from "./GroceryItemList";

export default function Page() {
  return (
    <main className="bg-stone-100 min-h-screen p-8 flex flex-col items-center">
      {/*Title*/}
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-wide">
        Shopping List
      </h1>
      {/*List*/}
      <ul className="space-y-2">
        <GroceryItemList />
      </ul>
    </main>
  );
}
