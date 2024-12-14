"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { RecipePopulatedProps } from "@/_models/RecipeModel";

interface SelectedRecipeContextType {
    recipe: RecipePopulatedProps | null;
    setRecipe: (recipe: RecipePopulatedProps | null) => void;
    changeURL: (recipe: RecipePopulatedProps) => void;
}

const SelectedRecipeContext = createContext<SelectedRecipeContextType | undefined>(undefined);

export const SelectedRecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipe, setRecipe] = useState<RecipePopulatedProps | null>(null);

    const changeURL = (recipe: RecipePopulatedProps) => {
        window.history.pushState({}, '', `/${recipe?.user.username}/${recipe?._id}`);
    };

    return (
        <SelectedRecipeContext.Provider value={{ recipe, setRecipe, changeURL }}>
            {children}
        </SelectedRecipeContext.Provider>
    );
};

export const useSelectedRecipe = () => {
    const context = useContext(SelectedRecipeContext);
    if (!context) {
        throw new Error("useSelectedRecipe must be used within a SelectedRecipeProvider");
    }
    return context;
};