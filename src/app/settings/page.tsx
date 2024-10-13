"use client";
import { useAuth } from "@/app/context/AuthContext";
import EditProfile from "./_components/EditProfile";
import { useEffect, useState } from "react";
import { ProfilePropsOrNull } from "../types/types";
import ErrorPage from "../_components/ErrorPage";

export default function SettingsPage() {
  const [fetchedUser, setFetchedUser] = useState<ProfilePropsOrNull>();
  const { initializing, user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (initializing) {
      return;
    }
    const fetchUser = async () => {
      try {
        if (isAuthenticated && user) {
          setFetchedUser(user);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [initializing, user, isAuthenticated]);

  return (
    <>
      {!initializing &&
        (isAuthenticated && user ? (
          <EditProfile user={fetchedUser} />
        ) : (
          <ErrorPage />
        ))}
    </>
  );
}
