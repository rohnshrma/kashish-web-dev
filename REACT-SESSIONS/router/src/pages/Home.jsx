import { Link } from "react-router-dom";

const Home = () => (
  <div style={{ padding: 12 }}>
    <h1>My Blog</h1>
    <p>Welcome! Read posts, or log in to write your own.</p>
    <Link to="/blogs">Read blogs</Link>
  </div>
);

export default Home;
