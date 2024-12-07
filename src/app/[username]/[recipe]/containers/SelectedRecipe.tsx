"use client"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/app/_context/ProfileContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import SelectedRecipeComponent from "../components/SelectedRecipeComponent";

export default function SelectedRecipe() {
  const pathname = usePathname();
  const router = useRouter();

  const pathParts = pathname.split("/");
  const recipeId = pathParts[pathParts.length - 1];

  const { profile } = useProfile();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipePopulatedProps | null>(() => {
    return profile.recipes.find((recipe) => recipe._id?.toString() === recipeId) as RecipePopulatedProps | undefined || null
  });
  const closeRecipe = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true);
    }
  }, []);

  useEffect(() => {
    toggleScrollbars(!!selectedRecipe);
    console.log(pathname)
  }, [selectedRecipe, pathname]);

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
  }, []);

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
