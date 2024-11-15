import { UserProps } from "@/models/UserModel";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchGetUserAPI } from "../_services/fetchGetUserAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProps | null;
  deleteCachedUser: () => void;
  verifyTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);

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
      console.error("Error", message);
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
