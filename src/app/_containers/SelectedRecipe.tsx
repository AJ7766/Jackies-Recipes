"use client"
import { useCallback, useEffect, useRef } from "react";
import SelectedRecipeComponent from "../_components/SelectedRecipeComponent";
import { useMobileCheck } from "../_hooks/isMobile";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import { useCheckScrollbars } from "../_hooks/checkScrollbars";

export default function SelectedRecipe() {
    const { recipe, setRecipe } = useSelectedRecipe();
    const closeRecipe = useRef<HTMLDivElement | null>(null);
    const isMobile = useMobileCheck();

    const handleCloseRecipe = () => {
        window.history.pushState({}, '', '/');
    }

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (closeRecipe.current && closeRecipe.current.contains(event.target as Node))
                handleCloseRecipe();
        },
        [handleCloseRecipe]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useCheckScrollbars(recipe, setRecipe);

    if (!recipe)
        return;

    return (
        <SelectedRecipeComponent
            recipe={recipe}
            isMobile={isMobile}
            closeRecipe={closeRecipe}
        />
    )
}