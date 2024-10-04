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
  updateProfile: (updatedProfile: ProfileProps) => void;
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
    const cachedProfile = sessionStorage.getItem("userProfile");
    if (cachedProfile) {
      setIsAuthenticated(true);
      setUser(JSON.parse(cachedProfile));
      setInitializing(false);
      return;
    }
    try {
      const res = await fetch("/api/verify-token-fetch-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setUser(data.userData);
        sessionStorage.setItem("userProfile", JSON.stringify(data.userData));
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        throw new Error(
          `Failed to verify token: ${res.status} - ${res.statusText}`
        );
      }
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

  const updateProfile = (updatedProfile: ProfileProps) => {
    setUser(updatedProfile);
    sessionStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        updateProfile,
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