import { Link } from "react-router-dom";

// Matched by path="*" - anything no other route matched.
const NotFound = () => (
  <div>
    <h1>404 - Page not found</h1>
    <Link to="/">Go home</Link>
  </div>
);

export default NotFound;
