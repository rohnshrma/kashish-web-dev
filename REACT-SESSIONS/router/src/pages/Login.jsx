import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ProtectedRoute stored the page they wanted in location.state.from
  const from = location.state?.from?.pathname || "/dashboard";

  // Already logged in? Don't show the form.
  if (user) return <Navigate to={from} replace />;

  const submitHandler = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate(from, { replace: true }); // go back to where they came from
    } else {
      setError("Wrong email or password");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <p>Try user@test.com / 123 or admin@test.com / 123</p>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
