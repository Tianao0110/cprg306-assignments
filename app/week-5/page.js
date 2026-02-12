import NewItem from "./NewItem";

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-950">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Item</h1>
        <NewItem />
      </div>
    </main>
  );
}