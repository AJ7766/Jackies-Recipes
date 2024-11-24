"use client"
import { UserProps } from "@/_models/UserModel";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchGetUserAPI } from "../_services/api/fetchGetUserAPI";
import { fetchGetLogoutAPI } from "../_services/api/fetchLogoutAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProps | null;
  deleteCachedUser: () => void;
  verifyTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverUser }: { children: React.ReactNode, serverUser: UserProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(serverUser || null);

  const verifyTokenAndFetchUser = useCallback(async (token: string) => {
    const cachedProfile = sessionStorage.getItem("user");
    if (cachedProfile) {
      setIsAuthenticated(true);
      setUser(JSON.parse(cachedProfile));
      return;
    }
    const { fetchedUser, message } = await fetchGetUserAPI(token);
    if (!fetchedUser) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setIsAuthenticated(false);
      throw new Error(message);
    }
    setIsAuthenticated(true);
    setUser(fetchedUser);
    sessionStorage.setItem("user", JSON.stringify(fetchedUser));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTokenAndUser = async () => {
      if (!token) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setIsAuthenticated(false);
        return;
      }
      await verifyTokenAndFetchUser(token);
    };
    fetchTokenAndUser();
  }, [verifyTokenAndFetchUser]);

  const logout = async () => {
    await fetchGetLogoutAPI();
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
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