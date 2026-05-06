import { useState } from "react";
import "./App.css";

type Ingredient = {
  id: number;
  userId: number;
  name: string;
  category: string;
  quantity: number;
  expirationDate: string; // TODO: string=>date
  expirationStatus: number;
};

function App() {
  const ingredientsList = [
    {
      id: 1,
      userId: 123,
      name: "tomato",
      category: "vegetable",
      quantity: 3,
      expirationDate: "2026-05-30",
      expirationStatus: 0,
    },
    {
      id: 2,
      userId: 123,
      name: "apple",
      category: "fruit",
      quantity: 2,
      expirationDate: "2026-05-30",
      expirationStatus: 0,
    },
    {
      id: 3,
      userId: 123,
      name: "chicken",
      category: "meat",
      quantity: 1,
      expirationDate: "2026-05-03",
      expirationStatus: 0,
    },
    {
      id: 4,
      userId: 123,
      name: "milk",
      category: "daily",
      quantity: 2,
      expirationDate: "2026-05-30",
      expirationStatus: 0,
    },
    {
      id: 5,
      userId: 123,
      name: "skyr",
      category: "daily",
      quantity: 1,
      expirationDate: "2026-04-28",
      expirationStatus: 0,
    },
    {
      id: 6,
      userId: 123,
      name: "salmon",
      category: "fish",
      quantity: 2,
      expirationDate: "2026-05-30",
      expirationStatus: 0,
    },
    {
      id: 7,
      userId: 123,
      name: "potato",
      category: "vegetable",
      quantity: 5,
      expirationDate: "2026-05-30",
      expirationStatus: 0,
    },
    {
      id: 8,
      userId: 123,
      name: "aubergine",
      category: "vegetable",
      quantity: 2,
      expirationDate: "2026-04-29",
      expirationStatus: 0,
    },
    {
      id: 9,
      userId: 123,
      name: "pork",
      category: "meat",
      quantity: 2,
      expirationDate: "2026-05-30",
      expirationStatus: 0,
    },
  ];

  const [allIngredients, setAllIngredients] =
    useState<Ingredient[]>(ingredientsList);
  const [selectedItem, setSelectedItem] = useState<Ingredient | null>(null);
  const firstToEat = allIngredients.filter(
    (item) => getExpirationStatus(item.expirationDate) > 0,
  );
  const freshItems = allIngredients.filter(
    (item) => getExpirationStatus(item.expirationDate) == 0,
  );
  console.log(allIngredients);

  function handleUse(id: number) {
    setAllIngredients((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
    setSelectedItem((prev) => {
      if (!prev) return null;
      if (prev.id !== id) return prev;

      if (prev.quantity - 1 <= 0) return null;

      return { ...prev, quantity: prev.quantity - 1 };
    });
  }

  return (
    <div>
      <div>👩🏻‍🍳</div>
      <div>
        <button>Add</button>
        <button>Recipe</button>
      </div>
      <div className="main">
        <div className="ingredients">
          <section className="foodSection">
            <div className="sectionTitle">Eat Me First</div>
            <Cards
              items={firstToEat}
              onSelect={setSelectedItem}
              selectedItem={selectedItem}
            />
          </section>
          <section className="foodSection">
            <div className="sectionTitle">Fresh items</div>
            <Cards
              items={freshItems}
              onSelect={setSelectedItem}
              selectedItem={selectedItem}
            />
          </section>
        </div>
        <div>
          <h3>Details</h3>
          <Details selectedItem={selectedItem} onUse={handleUse} />
        </div>
      </div>
    </div>
  );
}

function getRemainingDays(expirationDate: string): number {
  const today = new Date();
  const expiration = new Date(expirationDate);

  today.setHours(0, 0, 0, 0);
  expiration.setHours(0, 0, 0, 0);

  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.floor(diffDays);
}

function getExpirationStatus(expirationDate: string): number {
  const diffDays = getRemainingDays(expirationDate);

  if (diffDays <= 1) return 2;
  if (diffDays <= 3) return 1;
  return 0;
}

function Cards({
  items,
  onSelect,
  selectedItem,
}: {
  items: Ingredient[];
  onSelect: (item: Ingredient) => void;
  selectedItem: Ingredient | null;
}) {
  return (
    <div className="cards">
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          onSelect={onSelect}
          selectedItem={selectedItem}
        />
      ))}
    </div>
  );
}

function Card({
  item,
  onSelect,
  selectedItem,
}: {
  item: Ingredient;
  onSelect: (item: Ingredient) => void;
  selectedItem: Ingredient | null;
}) {
  const status = getExpirationStatus(item.expirationDate);
  const isSelected = selectedItem?.id == item.id;

  return (
    <div
      className={`card status-${status} ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(item)}
    >
      {item.name}
    </div>
  );
}

function Details({
  selectedItem,
  onUse,
}: {
  selectedItem: Ingredient | null;
  onUse: (id: number) => void;
}) {
  if (!selectedItem) {
    return <div>Select an item</div>;
  }

  const daysLeft = getRemainingDays(selectedItem.expirationDate);

  return (
    <div>
      <ul>
        <li>Name: {selectedItem.name}</li>
        <li>Category: {selectedItem.category}</li>
        <li>Quantity: {selectedItem.quantity}</li>
        <li>Expiration Date: {selectedItem.expirationDate}</li>
        <li>{daysLeft < 0 ? "Expired" : `${daysLeft} days left`}</li>
      </ul>
      <button onClick={() => onUse(selectedItem.id)}>Use</button>
    </div>
  );
}

export default App;
