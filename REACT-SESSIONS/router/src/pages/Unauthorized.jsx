import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div>
    <h1>403 - Not allowed</h1>
    <Link to="/">Go home</Link>
  </div>
);

export default Unauthorized;
