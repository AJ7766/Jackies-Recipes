"use client"
import { UserProps } from "@/_models/UserModel";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { fetchGetLogoutAPI } from "../_services/api/fetchLogoutAPI";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverUser }: { children: React.ReactNode, serverUser: UserProps }) {
  const [user, setUser] = useState<UserProps | null>(serverUser || null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTokenAndUser = async () => {
      if (!token) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }
    };
    fetchTokenAndUser();
  }, []);

  const logout = async () => {
    await fetchGetLogoutAPI();
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = ("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
