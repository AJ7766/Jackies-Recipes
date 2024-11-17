import { UserProps } from "@/_models/UserModel";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchGetUserAPI } from "../_services/api/fetchGetUserAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProps | null;
  deleteCachedUser: () => void;
  verifyTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
  fetchingUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [fetchingUser, setFetchinguser] = useState(true);

  const verifyTokenAndFetchUser = useCallback(async (token: string) => {
    const cachedProfile = sessionStorage.getItem("user");
    setFetchinguser(true);
    if (cachedProfile) {
      setIsAuthenticated(true);
      setUser(JSON.parse(cachedProfile));
      setFetchinguser(false);
      return;
    }
    const { fetchedUser, message } = await fetchGetUserAPI(token);
    if (!fetchedUser) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setIsAuthenticated(false);
      setFetchinguser(false);
      throw new Error(message);
    }
    setIsAuthenticated(true);
    setUser(fetchedUser);
    sessionStorage.setItem("user", JSON.stringify(fetchedUser));
    setFetchinguser(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTokenAndUser = async () => {
      if (!token) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setIsAuthenticated(false);
        setFetchinguser(false);
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
        fetchingUser
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
