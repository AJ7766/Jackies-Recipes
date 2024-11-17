import { useState, useEffect } from "react";
import { useAuth } from "../_context/AuthContext";
import ErrorPage from "../_errors/ErrorPage";
import LoginPage from "../_containers/LoginPage";

export const AuthGuard = ({ children }: {children: JSX.Element}) => {
  const { isAuthenticated, fetchingUser } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || fetchingUser) {
    return null;
  }

  if (!isAuthenticated) {
    return <ErrorPage />
  }

  return <>{children}</>;
};

export const AuthGuardLogin = ({ children }: {children: JSX.Element}) => {
  const { isAuthenticated, fetchingUser } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || fetchingUser) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <>{children}</>;
};