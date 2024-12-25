"use client"
import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { fetchGetLogoutAPI } from "../_services/api/fetchLogoutAPI";
import { UserProps } from "@/_types/UserModel";

interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverUser }: { children: React.ReactNode, serverUser: UserProps }) {
  const [user, setUser] = useState<UserProps | null>(serverUser || null);

  const logout = async () => {
    await fetchGetLogoutAPI();
    setUser(null);
    window.location.href = `/`;
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
