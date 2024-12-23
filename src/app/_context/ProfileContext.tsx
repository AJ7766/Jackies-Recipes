"use client"
import React, { createContext, useContext, useState } from "react";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import mongoose from "mongoose";

interface ProfileContextType {
  profile: UserPopulatedRecipePopulatedProps;
  handleRecipeChange: (recipes: RecipePopulatedProps[]) => void;
  handleFollowersChange: (user_id: mongoose.Types.ObjectId, operation: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, serverProfile }: { children: React.ReactNode, serverProfile: UserPopulatedRecipePopulatedProps }) {
  const [profile, setProfile] = useState<UserPopulatedRecipePopulatedProps>((serverProfile));

  const handleRecipeChange = (recipes: RecipePopulatedProps[]) => {
    setProfile((prev) => ({
      ...prev,
      recipes
    })
    )
  }

  const handleFollowersChange = (user_id: mongoose.Types.ObjectId, operation: string) => {
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
