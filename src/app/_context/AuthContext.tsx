"use client"
import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { fetchGetLogoutAPI } from "../_services/api/fetchLogoutAPI";
import { UserProps } from "@/_types/UserTypes";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProps | null;
  handleSetUser: (user: UserProps | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(() => {
    if (typeof window !== 'undefined')
      return JSON.parse(localStorage.getItem('user') || 'null');
    return null;
  });
  const router = useRouter();

  const handleSetUser = (user: UserProps | null) => {
    if (!user)
      localStorage.removeItem('user');

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    await fetchGetLogoutAPI();
    router.push('/');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSetUser,
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
