import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";

// PRIVATE ROUTE: allowed -> show the child route, not allowed -> go to /login
const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // where the user is trying to go

  if (!user) {
    // `state` carries a note: "they wanted this page", so Login can send them back.
    // `replace` so the Back button doesn't return to the blocked page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />; // logged in: render the matched child
};

export default ProtectedRoute;
