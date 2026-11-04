import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = logged out

  // Fake login: any non-empty name + password "123" works.
  const login = (name, password) => {
    if (!name.trim() || password !== "123") return false;
    setUser({ name: name.trim() });
    return true;
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
