import Item from "./item";
import items from "./items.json";

export default function ItemList() {
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedItems).sort();
  return (
    <div className="space-y-8">
      {}
      {categories.map((category) => (
        <section key={category}>
          {}
          <h2 className="text-2xl font-bold text-amber-600 capitalize mb-4 border-b-2 border-slate-300 pb-2">
            {category}
          </h2>

          <ul className="flex flex-col gap-4">
            {}
            {groupedItems[category].map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
