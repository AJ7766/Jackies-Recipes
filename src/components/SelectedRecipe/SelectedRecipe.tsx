"use client";
import { useSelectedRecipe } from "@/app/_context/SelectedRecipeContext";
import { useCheckScrollbars } from "@/app/_hooks/checkScrollbars";
import { useIsResponsive } from "@/app/_hooks/useIsResponsive";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { RecipeMacros } from "./ui/RecipeMacros";
import { RecipeIngredients } from "./ui/RecipeIngredients";
import { RecipeInstructions } from "./ui/RecipeInstructions";
import { RecipeHeader } from "./ui/RecipeHeader";

const closeIcon = "/images/icons/close-recipe.svg";

export default function SelectedRecipe() {
    const { recipe, handleCloseRecipe, toggleScrollbars } = useSelectedRecipe();
    const { isMobile, isClient } = useIsResponsive();
    useCheckScrollbars(recipe, toggleScrollbars);

    if (!recipe) return null;

    return (
        <>
            <div className="recipeContainer">
                <div className="recipeLeftSideWrapper">
                    <div className="flex flex-row">
                        <RecipeHeader
                            username={recipe.user.username}
                            profilePicture={recipe.user.userContent?.profilePicture || "/images/profile-picture.png"}
                            recipeTitle={recipe.title}
                        />
                        {(!isClient || (isClient && isMobile)) && recipe.image && (
                            <CldImage
                                className="recipe-image"
                                width={1280}
                                height={850}
                                src={recipe.image}
                                alt="recipe-image"
                                fetchPriority="high"
                                format="webp"
                            />
                        )}
                    </div>
                    <RecipeMacros
                        macros={recipe.macros || {}}
                    />
                    <RecipeIngredients
                        servings={recipe?.servings}
                        ingredients={recipe?.ingredients}
                    />
                </div>
                <div className="recipeRightSideWrapper">
                    {(!isClient || (isClient && !isMobile)) && recipe.image && (
                        <CldImage
                            width={1280}
                            height={850}
                            src={recipe.image}
                            priority
                            alt="recipe-image"
                            format="webp"
                        />
                    )}
                    <RecipeInstructions instructions={recipe.instructions ?? []} />
                </div>
            </div>
            <div className="recipeBackground" onClick={handleCloseRecipe}>
                <Image src={closeIcon} width={24} height={24} alt="close-recipe" />
            </div>
        </>
    );
}
