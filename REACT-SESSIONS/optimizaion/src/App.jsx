import { useMemo, useState } from "react";

const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 10000),
}));

const App = () => {
  console.log("App Re-rendered");
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    console.log("Filtering and sorting products");
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => a.price - b.price);
  }, [search]);

  return (
    <div>
      <h1>Product Dashboard</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products"
      />

      <h2>Counter : {count}</h2>
      <button onClick={() => setCount(count + 1)}>INCREASE</button>

      <h3> products : {filteredProducts.length}</h3>

      {filteredProducts.slice(0, 10000).map((product) => {
        return (
          <p key={product.id}>
            {product.name} - Rs. {product.price}
          </p>
        );
      })}
    </div>
  );
};

export default App;
