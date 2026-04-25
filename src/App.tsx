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
      expirationDate: "2026-04-26",
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
      expirationDate: "2026-04-28",
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
  const firstToEat = allIngredients.filter(
    (item) => getExpirationStatus(item.expirationDate) > 0,
  );
  const freshItems = allIngredients.filter(
    (item) => getExpirationStatus(item.expirationDate) == 0,
  );
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
            <div>Eat Me First</div>
            <Cards items={firstToEat} />
          </section>
          <section className="foodSection">
            <div>Fresh items</div>
            <Cards items={freshItems} />
          </section>
        </div>
        <div>Graph</div>
      </div>
    </div>
  );
}

function getExpirationStatus(expirationDate: string): number {
  const today = new Date();
  const expiration = new Date(expirationDate);

  today.setHours(0, 0, 0, 0);
  expiration.setHours(0, 0, 0, 0);

  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays <= 1) return 2;
  if (diffDays <= 3) return 1;
  return 0;
}

function Cards({ items }: { items: Ingredient[] }) {
  return (
    <div className="cards">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

function Card({ item }: { item: Ingredient }) {
  const status = getExpirationStatus(item.expirationDate);
  return <div className={`card status-${status}`}>{item.name}</div>;
}

export default App;
