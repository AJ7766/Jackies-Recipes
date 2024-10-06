"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProfilePropsOrNull } from "@/app/types/types";
import { useParams } from "next/navigation";

interface ProfileContextType {
  profile: ProfilePropsOrNull;
  userFound: boolean;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProivder({ children }: { children: React.ReactNode }) {
  const [userFound, setUserFound] = useState(false);
  const [profile, setProfile] = useState<ProfilePropsOrNull>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  
  const lowercaseUsername = Array.isArray(username)
    ? username[0].toLowerCase()
    : username?.toLowerCase() ?? "";

  useEffect(() => {
    if (lowercaseUsername) {
      const fetchProfileData = async () => {
        try {
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
          setUserFound(true);
        } catch (error: any) {
          console.error("Error fetching profile:", error.message);
          setUserFound(false);
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
  }, [lowercaseUsername]);

  return (
    <ProfileContext.Provider value={{ profile, userFound, loading }}>
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
