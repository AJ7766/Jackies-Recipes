"use client"
import { useLayoutEffect, useState } from "react";
import SelectedRecipeComponent from "../components/SelectedRecipeComponent";
import { RecipeProps } from "@/_types/RecipeTypes";

export default function SelectedRecipe({ recipe }: { recipe: RecipeProps | null }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true);
    }
  }, []);

  return (
    <SelectedRecipeComponent
      recipe={recipe}
      isSmallScreen={isSmallScreen}
    />
  )
}