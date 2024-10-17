"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProfileProps } from "@/app/types/types";
import { useParams } from "next/navigation";

interface ProfileContextType {
  profile: ProfileProps | null;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  const lowercaseUsername = Array.isArray(username)
    ? username[0].toLowerCase()
    : username?.toLowerCase() ?? "";

  useEffect(() => {
    if (!lowercaseUsername) return;
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        let res = await fetch(`/api/profile?username=${lowercaseUsername}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error(
            `Failed to fetch profile: ${res.status} - ${res.statusText}`
          );
        }
        const data = await res.json();
        setProfile(data.profileData);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [lowercaseUsername]);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
