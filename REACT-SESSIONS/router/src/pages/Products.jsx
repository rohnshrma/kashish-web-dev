import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data";

// useSearchParams = useState that lives in the URL (?q=mouse&category=Home).
// Result: the filtered view is shareable, bookmarkable and survives refresh.
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "All";

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  // Filter during render, same idea as the inventory bonus tasks.
  const visible = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) &&
      (category === "All" || p.category === category),
  );

  const update = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "All") next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div>
      <h1>Products</h1>
      <input
        placeholder="Search..."
        value={q}
        onChange={(e) => update("q", e.target.value)}
      />
      <select value={category} onChange={(e) => update("category", e.target.value)}>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {visible.length === 0 && <p>No products found</p>}
      <ul>
        {visible.map((p) => (
          // Dynamic URL: /products/1, /products/2 ...
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link> - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
