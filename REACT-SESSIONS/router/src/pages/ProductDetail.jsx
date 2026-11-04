import { useLoaderData, useNavigate } from "react-router-dom";
import { getProduct } from "../data";

// LOADER: runs BEFORE this page renders. Data is ready when the component
// mounts, so no useEffect / loading state is needed in the component.
// Throwing a Response sends the user to the route's errorElement.
// eslint-disable-next-line react-refresh/only-export-components
export const productLoader = ({ params }) => {
  const product = getProduct(params.id); // params.id comes from "products/:id"
  if (!product) throw new Response("Product not found", { status: 404 });
  return product;
};

const ProductDetail = () => {
  const product = useLoaderData(); // whatever the loader returned
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>&larr; Back</button>
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <p>₹{product.price}</p>
    </div>
  );
};

export default ProductDetail;
