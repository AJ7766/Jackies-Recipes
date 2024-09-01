"use client"
import LoginForm from "./_components/LoginForm";
import { useEffect } from "react";
import { useAuth } from "./authContext/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isAuthenticated, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
  if (isAuthenticated && user) {

    router.push(`/${user.username}`);
  }
  }, [isAuthenticated, user, router]);
  if(initializing){
    return null;
  }
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  return null
}

