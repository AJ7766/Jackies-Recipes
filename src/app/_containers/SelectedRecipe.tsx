"use client"
import SelectedRecipeComponent from "../_components/SelectedRecipeComponent";
import { useMobileCheck } from "../_hooks/isMobile";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import { useCheckScrollbars } from "../_hooks/checkScrollbars";

export default function SelectedRecipe() {
    const { recipe, handleCloseRecipe, toggleScrollbars } = useSelectedRecipe();
    const isMobile = useMobileCheck();

    useCheckScrollbars(recipe, toggleScrollbars);

    if (!recipe)
        return;

    return (
        <SelectedRecipeComponent
            recipe={recipe}
            isMobile={isMobile}
            handleCloseRecipe={handleCloseRecipe}
        />
    )
}