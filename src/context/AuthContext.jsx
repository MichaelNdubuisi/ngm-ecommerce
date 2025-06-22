import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("ngm-admin");
    if (storedAuth === "true") setIsAdmin(true);
  }, []);

  const login = (password) => {
    if (password === "ngm@2024") { // ✅ change this to your secret password
      localStorage.setItem("ngm-admin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("ngm-admin");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
