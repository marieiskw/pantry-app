import "./App.css";

function App() {
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
            <Cards />
          </section>
          <section className="foodSection">
            <div>All items</div>
          </section>
        </div>
        <div>Graph</div>
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="cards">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

function Card() {
  return <div className="card">aaa</div>;
}

export default App;
