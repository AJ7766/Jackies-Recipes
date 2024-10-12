"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ProfileProps } from "../types/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileProps | null;
  deleteCachedUser: () => void;
  verifyTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileProps | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const router = useRouter();

  const verifyTokenAndFetchUser = useCallback(async (token: string) => {
    const cachedProfile = sessionStorage.getItem("user");
    if (cachedProfile) {
      setIsAuthenticated(true);
      setUser(JSON.parse(cachedProfile));
      setInitializing(false);
      return;
    }
    try {
      setInitializing(true);
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        throw new Error(
          `Failed to verify token: ${res.status} - ${res.statusText}`
        );
      }
      const data = await res.json();
      setIsAuthenticated(true);
      setUser(data.userData);
      sessionStorage.setItem("user", JSON.stringify(data.userData));
    } catch (error) {
      console.error("Error", error);
      localStorage.removeItem("token");
      sessionStorage.removeItem("userProfile");
      setIsAuthenticated(false);
    } finally {
      setInitializing(false);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTokenAndUser = async () => {
      if (token) {
        await verifyTokenAndFetchUser(token);
      } else {
        setInitializing(false);
      }
    };
    fetchTokenAndUser();
  }, [verifyTokenAndFetchUser]);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userProfile");
    setIsAuthenticated(false);
    setUser(null);
    router.push(`/`);
  };

  const deleteCachedUser = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        deleteCachedUser,
        verifyTokenAndFetchUser,
        logout,
        initializing,
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
