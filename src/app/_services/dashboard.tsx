import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../_containers/LoginPage";

export const AuthGuard = ({ children }: {children: JSX.Element}) => {
  const { isAuthenticated } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};
