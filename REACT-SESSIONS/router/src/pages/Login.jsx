import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // The page ProtectedRoute remembered (or /dashboard if they came to /login directly)
  const from = location.state?.from?.pathname || "/dashboard";

  if (user) return <Navigate to={from} replace />; // already logged in

  const submitHandler = (e) => {
    e.preventDefault();
    if (login(name, password)) {
      navigate(from, { replace: true }); // go where they wanted to go
    } else {
      setError("Enter a name and the password 123");
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ padding: 12 }}>
      <h1>Login</h1>
      <p>Any name, password: 123</p>
      <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
