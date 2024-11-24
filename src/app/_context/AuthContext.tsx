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
  user: UserProps | null;
  deleteCachedUser: () => void;
  verifyTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, serverUser }: { children: React.ReactNode, serverUser: UserProps }) {
  const [user, setUser] = useState<UserProps | null>(serverUser || null);

  const verifyTokenAndFetchUser = useCallback(async (token: string) => {
    const cachedProfile = sessionStorage.getItem("user");
    if (cachedProfile) {
      setUser(JSON.parse(cachedProfile));
      return;
    }
    const { fetchedUser, message } = await fetchGetUserAPI(token);
    if (!fetchedUser) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      throw new Error(message);
    }
    setUser(fetchedUser);
    sessionStorage.setItem("user", JSON.stringify(fetchedUser));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTokenAndUser = async () => {
      if (!token) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
        return;
      }
      await verifyTokenAndFetchUser(token);
    };
    fetchTokenAndUser();
  }, [verifyTokenAndFetchUser]);

  const logout = () => {
    fetchGetLogoutAPI();
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const deleteCachedUser = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
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
