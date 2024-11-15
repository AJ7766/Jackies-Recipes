import ErrorPage from "@/app/_errors/ErrorPage";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";

export const AuthGuardEditUser = ({ children }: {children: JSX.Element}) => {
  const { isAuthenticated } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!isAuthenticated) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};
