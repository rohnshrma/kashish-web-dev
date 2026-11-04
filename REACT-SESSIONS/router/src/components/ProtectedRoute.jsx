import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// PRIVATE ROUTE. Used as a layout route (no path) that wraps other routes.
//   <Route element={<ProtectedRoute />}>  ...children are protected...  </Route>
// `role` is optional: <ProtectedRoute role="admin" /> also checks the role.
const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not logged in -> go to /login and remember where they wanted to go.
    // `replace` so the Back button doesn't bounce them back to the guarded page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />; // allowed: render the matched child route
};

export default ProtectedRoute;
