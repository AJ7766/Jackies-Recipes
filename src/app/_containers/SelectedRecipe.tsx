"use client"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/app/_context/ProfileContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import SelectedRecipeComponent from "../_components/SelectedRecipeComponent";
import { useMobileCheck } from "../_hooks/isMobile";
import mongoose from "mongoose";

export default function SelectedRecipe(recipe_id: mongoose.Types.ObjectId) {
  const pathname = usePathname();
  const router = useRouter();

  const { profile } = useProfile();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipePopulatedProps | null>(() => {
    return profile.recipes.find((recipe) => recipe._id?.toString() === recipe_id.toString()) as RecipePopulatedProps | undefined || null
  });
  const closeRecipe = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileCheck();

  useEffect(() => {
    toggleScrollbars(!!selectedRecipe);
  }, [selectedRecipe, pathname]);

  const toggleScrollbars = (disable: boolean) => {
    document.body.style.overflow = disable ? "hidden" : "auto";

    if (window.innerWidth > 1024) {
      document.body.style.paddingRight = disable ? "7px" : "";
    }
  };

  const handleCloseRecipe = useCallback(() => {
    router.push(`/${profile?.username}`, { scroll: false });
    setSelectedRecipe(null);
  }, [profile?.username, router]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        closeRecipe.current &&
        closeRecipe.current.contains(event.target as Node)
      ) {
        setSelectedRecipe(null);
        handleCloseRecipe();
      }
    },
    [handleCloseRecipe]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!selectedRecipe)
    return null;

  return (
    <SelectedRecipeComponent
      selectedRecipe={selectedRecipe}
      isMobile={isMobile}
      profile={profile}
      closeRecipe={closeRecipe}
    />
  )
}