"use client"
import { useLayoutEffect, useState } from "react";
import { useProfile } from "@/app/_context/ProfileContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import SelectedRecipeComponent from "../components/SelectedRecipeComponent";

export default function SelectedRecipe({ recipe_id }: { recipe_id: string }) {
  const { profile } = useProfile();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipePopulatedProps | null>(() => {
    return profile.recipes.find((recipe) => recipe._id?.toString() === recipe_id) as RecipePopulatedProps | undefined || null
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true);
    }
  }, []);

  if (!selectedRecipe)
    return null;

  return (
    <SelectedRecipeComponent
      selectedRecipe={selectedRecipe}
      isSmallScreen={isSmallScreen}
      profile={profile}
    />
  )
}