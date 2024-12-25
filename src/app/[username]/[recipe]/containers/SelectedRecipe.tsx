"use client"
import { useLayoutEffect, useState } from "react";
import { useProfile } from "@/app/_context/ProfileContext";
import SelectedRecipeComponent from "../components/SelectedRecipeComponent";
import { RecipeProps } from "@/_types/RecipeModel";

export default function SelectedRecipe({ recipe_id }: { recipe_id: string }) {
  const { profile } = useProfile();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeProps | null>(() => {
    return profile.recipes?.find((recipe) => recipe._id === recipe_id) as RecipeProps | undefined || null
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true);
    }
  }, []);
  
  return (
    <SelectedRecipeComponent
      selectedRecipe={selectedRecipe}
      isSmallScreen={isSmallScreen}
      profile={profile}
    />
  )
}