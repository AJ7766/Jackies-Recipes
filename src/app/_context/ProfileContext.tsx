"use client"
import React, { createContext, useContext, useState } from "react";
import { UserProps } from "@/_models/UserModel";
import { RecipeProps } from "@/_models/RecipeModel";

interface ProfileContextType {
  profile: UserProps;
  handleRecipeChange: (recipes: RecipeProps[]) => void;
  handleFollowersChange: (user_id: string, operation: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, serverProfile }: { children: React.ReactNode, serverProfile: UserProps }) {
  const [profile, setProfile] = useState<UserProps>((serverProfile));

  const handleRecipeChange = (recipes: RecipeProps[]) => {
    setProfile((prev) => ({
      ...prev,
      recipes
    })
    )
  }

  const handleFollowersChange = (user_id: string, operation: string) => {
    if (operation === 'follow') {
      setProfile((prev) => ({
        ...prev,
        followers: [...prev.followers || [], user_id]
      })
      )
    } else if (operation === 'unfollow') {
      setProfile((prev) => ({
        ...prev,
        followers: prev.followers?.filter((follower) => follower !== user_id)
      })
      )
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, handleRecipeChange, handleFollowersChange }}>
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
