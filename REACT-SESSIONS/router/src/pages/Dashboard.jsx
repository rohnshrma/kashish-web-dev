import { useAuth } from "../context/AuthContext";

// Private page: only reachable through <ProtectedRoute />.
const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p> {/* safe: ProtectedRoute guarantees user */}
    </div>
  );
};

export default Dashboard;
