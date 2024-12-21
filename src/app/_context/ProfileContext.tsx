"use client"
import React, { createContext, useContext, useState } from "react";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { RecipePopulatedProps } from "@/_models/RecipeModel";

interface ProfileContextType {
  profile: UserPopulatedRecipePopulatedProps;
  handleRecipeChange: (recipes: RecipePopulatedProps[]) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, serverProfile }: { children: React.ReactNode, serverProfile: UserPopulatedRecipePopulatedProps }) {
  const [profile, setProfile] = useState<UserPopulatedRecipePopulatedProps>((serverProfile))
  
  const handleRecipeChange = (recipes: RecipePopulatedProps[]) => {
    setProfile((prev) => ({
      ...prev,
      recipes
    })
    )
  }

  return (
    <ProfileContext.Provider value={{ profile, handleRecipeChange }}>
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
