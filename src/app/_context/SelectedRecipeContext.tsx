"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import mongoose from "mongoose";

interface SelectedRecipeContextType {
    recipe: RecipePopulatedProps | null;
    setRecipe: (recipe: RecipePopulatedProps | null) => void;
    changeURL: (username: string, recipe_id: mongoose.Types.ObjectId) => void;
}

const SelectedRecipeContext = createContext<SelectedRecipeContextType | undefined>(undefined);

export const SelectedRecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipe, setRecipe] = useState<RecipePopulatedProps | null>(null);
    const changeURL = (username: string, recipe_id: mongoose.Types.ObjectId) => {
        window.history.pushState({}, '', `/${username}/${recipe_id}`);
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