import { Link } from "react-router-dom";

// Matched by path="*" : any URL no other route matched.
const NotFound = () => (
  <div style={{ padding: 12 }}>
    <h1>404 - Page not found</h1>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFound;
