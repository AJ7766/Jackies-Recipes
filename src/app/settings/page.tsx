"use client";
import { useAuth } from "@/app/context/AuthContext";
import EditProfile from "./_components/EditProfile";
import ErrorPage from "../_components/ErrorPage";

export default function SettingsPage() {
  const { initializing, user, isAuthenticated } = useAuth();

  return (
    <>
      {!initializing &&
        (isAuthenticated && user ? (
          <EditProfile user={user} />
        ) : (
          <ErrorPage />
        ))}
    </>
  );
}
