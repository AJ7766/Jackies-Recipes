"use client"
import Image from "next/image";
import { RecipeHeader } from "../SelectedRecipe/ui/RecipeHeader";
import { RecipeMacros } from "../SelectedRecipe/ui/RecipeMacros";
import { RecipeIngredients } from "../SelectedRecipe/ui/RecipeIngredients";
import { RecipeInstructions } from "../SelectedRecipe/ui/RecipeInstructions";
import { RecipeProps } from "@/_types/RecipeTypes";
import { useIsResponsive } from "@/_hooks/useIsResponsive";

export const Recipe = ({ recipe }: { recipe: RecipeProps }) => {
    const { isMobile, isClient } = useIsResponsive();
    if (!recipe) return;

    return (
        <>
            <div className="recipeContainer static md:w-full h-full w-auto">
                <div className="recipeLeftSideWrapper md:p-12 p-0">
                    <div className="flex flex-row">
                        <RecipeHeader
                            username={recipe.user.username}
                            profilePicture={recipe.user.userContent?.profilePicture || "/images/profile-picture.png"}
                            recipeTitle={recipe.title}
                        />
                        {(!isClient || (isClient && isMobile)) && recipe.image && (
                            <Image
                                className="recipe-image md:hidden block"
                                width={1280}
                                height={850}
                                src={recipe.image}
                                alt="recipe-image"
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
                <div className="recipeRightSideWrapper md:h-screen h-m-full md:p-12 p-0">
                    {(!isClient || (isClient && !isMobile)) && recipe.image && (
                        <Image
                            className="md:block hidden"
                            width={1280}
                            height={850}
                            src={recipe.image}
                            priority
                            alt="recipe-image"
                        />
                    )}
                    <RecipeInstructions instructions={recipe.instructions ?? []} />
                </div>
            </div>
        </>
    );
}