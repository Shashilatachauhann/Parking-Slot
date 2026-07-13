import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const persistLogin = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signup = async (formData) => {
    const { data } = await api.post("/auth/signup", formData);
    persistLogin(data.user, data.token);
    return data.user;
  };

  const login = async (email, password, expectedRole) => {
    const { data } = await api.post("/auth/login", { email, password });

    if (expectedRole && data.user.role !== expectedRole) {
      throw new Error(
        `This account is registered as "${data.user.role}". Please switch the role selector above.`
      );
    }

     persistLogin(data.user, data.token);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = async (fields) => {
    const { data } = await api.patch("/auth/me", fields);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const value = {
    user, 
    isLoggedIn: !!user,
    role: user?.role || null,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}
