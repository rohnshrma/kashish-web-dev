import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Fake users. A real app asks the backend and gets a token back.
const USERS = [
  { email: "user@test.com", password: "123", role: "user" },
  { email: "admin@test.com", password: "123", role: "admin" },
];

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = logged out

  const login = (email, password) => {
    const found = USERS.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    setUser({ email: found.email, role: found.role });
    return true;
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
