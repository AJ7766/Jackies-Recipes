"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/app/_context/ProfileContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import SelectedRecipeComponent from "../components/SelectedRecipeComponent";

export default function SelectedRecipe() {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipePopulatedProps | null>(null);
  const closeRecipe = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { profile } = useProfile();

  useEffect(() => {
    const pathParts = pathname.split("/");
    const recipeId = pathParts[pathParts.length - 1];

    if (profile?.recipes) {
      const foundRecipe = profile.recipes.find(
        (recipe) => recipe._id?.toString() === recipeId
      ) as RecipePopulatedProps | undefined;
      setSelectedRecipe(foundRecipe ?? null);
    }
  }, [pathname, profile]);

  useEffect(() => {
    toggleScrollbars(!!selectedRecipe);
  }, [selectedRecipe]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleScrollbars = (disable: boolean) => {
    document.body.style.overflow = disable ? "hidden" : "auto";

    if (window.innerWidth > 1024) {
      document.body.style.paddingRight = disable ? "7px" : "";
    }
  };

  const handleCloseRecipe = useCallback(() => {
    router.replace(`/${profile?.username}`, { scroll: false });
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
  }, [handleClickOutside]);

  if (!selectedRecipe)
    return null;

  return (
    <SelectedRecipeComponent
      selectedRecipe={selectedRecipe}
      isSmallScreen={isSmallScreen}
      profile={profile}
      closeRecipe={closeRecipe}
    />
  )
}
