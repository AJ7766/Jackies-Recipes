"use client"
import React, { createContext, useContext, useState } from "react";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";

interface ProfileContextType {
  profile: UserPopulatedRecipePopulatedProps;
  setProfile: React.Dispatch<React.SetStateAction<UserPopulatedRecipePopulatedProps>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, serverProfile }: { children: React.ReactNode, serverProfile: UserPopulatedRecipePopulatedProps }) {
  const [profile, setProfile] = useState<UserPopulatedRecipePopulatedProps>(() => {
    if (typeof window !== "undefined") {
      const cached_profile = sessionStorage.getItem("profile");
      if (cached_profile) {
        return JSON.parse(cached_profile);
      }
    }
    return serverProfile;
  });

  if (typeof window !== "undefined") {
    console.log("server-bio:",serverProfile.userContent?.bio)
    sessionStorage.setItem("profile", JSON.stringify(serverProfile));
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
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
