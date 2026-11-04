import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  // NavLink passes { isActive } so we can highlight the current page.
  const style = ({ isActive }) => ({
    marginRight: 12,
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ccc" }}>
      {/* `end` = only highlight Home on exactly "/" */}
      <NavLink to="/" style={style} end>Home</NavLink>
      <NavLink to="/blogs" style={style}>Blogs</NavLink>
      {user && <NavLink to="/dashboard" style={style}>Dashboard</NavLink>}
      <span style={{ float: "right" }}>
        {user ? (
          <>
            Hi, {user.name} <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
