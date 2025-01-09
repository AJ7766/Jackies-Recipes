"use client"
import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { fetchGetLogoutAPI } from "../../server/api/fetchLogoutAPI";
import { UserProps } from "@/_types/UserTypes";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProps | null;
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

  const logout = async () => {
    await fetchGetLogoutAPI();
    router.push('/login');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
