"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { usePathname } from "next/navigation";

interface ProfileContextType {
  profile: UserPopulatedRecipePopulatedProps;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, serverProfile }: { children: React.ReactNode, serverProfile: UserPopulatedRecipePopulatedProps }) {
  const [profile, setProfile] = useState<UserPopulatedRecipePopulatedProps>(serverProfile);

  const pathname = usePathname();

  useEffect(() => {
    setProfile(serverProfile);
  }, [pathname])

  return (
    <ProfileContext.Provider value={{ profile }}>
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
