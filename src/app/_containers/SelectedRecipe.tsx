"use client"
import SelectedRecipeComponent from "../_components/SelectedRecipeComponent";
import { useIsResponsive } from "../_hooks/useIsResponsive";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import { useCheckScrollbars } from "../_hooks/checkScrollbars";

export default function SelectedRecipe() {
    const { recipe, handleCloseRecipe, toggleScrollbars } = useSelectedRecipe();
    const { isMobile, isClient } = useIsResponsive();
    
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