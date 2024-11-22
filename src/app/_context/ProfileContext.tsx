import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { fetchGetProfileAPI } from "../_services/api/fetchGetProfileAPI";

interface ProfileContextType {
  profile: UserPopulatedRecipePopulatedProps | null;
  fetchingProfile: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserPopulatedRecipePopulatedProps | null>(null);
  const [fetchingProfile, setFetchingProfile] = useState<boolean>(true);
  const { username } = useParams();

  const lowercaseUsername = Array.isArray(username)
    ? username[0].toLowerCase()
    : username?.toLowerCase() ?? username;

  useEffect(() => {
    if (!lowercaseUsername) return;
    const fetchProfileData = async () => {
      setFetchingProfile(true);
      const { fetchedProfile, message } = await fetchGetProfileAPI(
        lowercaseUsername
      );
      if (!fetchedProfile) {
        console.error(message);
        setProfile(null);
        setFetchingProfile(false);
        return;
      }
      setProfile(fetchedProfile);
      setFetchingProfile(false);
    };
    fetchProfileData();
  }, [lowercaseUsername]);

  return (
    <ProfileContext.Provider value={{ profile, fetchingProfile }}>
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
