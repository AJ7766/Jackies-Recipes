"use client"
import SelectedRecipeComponent from "../_components/SelectedRecipeComponent";
import { useIsMobile } from "../_hooks/useIsMobile";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import { useCheckScrollbars } from "../_hooks/checkScrollbars";

export default function SelectedRecipe() {
    const { recipe, handleCloseRecipe, toggleScrollbars } = useSelectedRecipe();
    const { isMobile, isClient } = useIsMobile();

    useCheckScrollbars(recipe, toggleScrollbars);

    if (!recipe)
        return;

    return (
        <SelectedRecipeComponent
            recipe={recipe}
            isMobile={isMobile}
            isClient={isClient}
            handleCloseRecipe={handleCloseRecipe}
        />
    )
}