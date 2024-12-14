"use client"
import { useCallback, useEffect, useRef } from "react";
import SelectedRecipeComponent from "../_components/SelectedRecipeComponent";
import { useMobileCheck } from "../_hooks/isMobile";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import { useCheckScrollbars } from "../_hooks/checkScrollbars";

export default function SelectedRecipe() {
    const { recipe, setRecipe, handleCloseRecipe } = useSelectedRecipe();
    const isMobile = useMobileCheck();

    useCheckScrollbars(recipe, setRecipe);

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