import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ProfileProps } from "../types/types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: ProfileProps | null;
  deleteCachedUser: () => void;
  verifyTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileProps | null>(null);

  const verifyTokenAndFetchUser = useCallback(async (token: string) => {
    const cachedProfile = sessionStorage.getItem("user");
    if (cachedProfile) {
      setIsAuthenticated(true);
      setUser(JSON.parse(cachedProfile));
      return;
    }
    try {
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
      sessionStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = localStorage.getItem("token");
      if (token) 
        await verifyTokenAndFetchUser(token);
    };
    fetchTokenAndUser();
  }, [verifyTokenAndFetchUser]);

  const logout = () => {
    window.location.href = "/";
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
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
