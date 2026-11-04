import { NavLink, Outlet } from "react-router-dom";

// Parent of the nested routes. The child page appears at <Outlet />.
const Dashboard = () => (
  <div style={{ padding: 12 }}>
    <h1>Dashboard</h1>
    <NavLink to="/dashboard" end style={{ marginRight: 12 }}>My posts</NavLink>
    <NavLink to="/dashboard/new">New post</NavLink>
    <hr />
    <Outlet />
  </div>
);

export default Dashboard;
