import { Link, NavLink, Outlet, useNavigation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Shared shell. Every page renders INSIDE <Outlet />.
const Layout = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation(); // "idle" | "loading" | "submitting"

  // NavLink gives us { isActive } so we can style the current link.
  const linkStyle = ({ isActive }) => ({
    marginRight: 12,
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "tomato" : "inherit",
  });

  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #ccc" }}>
        {/* `end` stops "/" from matching every URL */}
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/products" style={linkStyle}>Products</NavLink>
        <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
        {user && <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>}
        {user?.role === "admin" && (
          <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
        )}
        <span style={{ float: "right" }}>
          {user ? (
            <>
              {user.email} <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </span>
      </nav>
      {navigation.state === "loading" && <p>Loading...</p>}
      <main style={{ padding: 12 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
