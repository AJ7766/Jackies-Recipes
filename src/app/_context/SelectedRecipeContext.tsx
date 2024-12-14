"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import mongoose from "mongoose";

interface SelectedRecipeContextType {
    recipe: RecipePopulatedProps | null;
    selectedRecipeHandler: (recipe: RecipePopulatedProps) => void;
    changeURL: (username: string, recipe_id: mongoose.Types.ObjectId) => void;
    handleCloseRecipe: () => void;
    toggleScrollbars: (disable: boolean) => void;
}

const SelectedRecipeContext = createContext<SelectedRecipeContextType | undefined>(undefined);

const changeURL = (username: string, recipe_id: mongoose.Types.ObjectId) => {
    window.history.pushState({}, '', `/${username}/${recipe_id}`);
};

const handleCloseRecipe = () => {
    window.history.back();
}

export const SelectedRecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipe, setRecipe] = useState<RecipePopulatedProps | null>(null);
    const [prevUrl, setPrevUrl] = useState('/');

    const selectedRecipeHandler = (recipe: RecipePopulatedProps, prevUrl?: string) => {
        changeURL(recipe.user.username, recipe._id);
        setRecipe(recipe);
        if (prevUrl)
            setPrevUrl(prevUrl)
    }

    const toggleScrollbars = (disable: boolean) => {
        if (disable) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            setRecipe(null)
        }
        if (window.innerWidth > 1024) {
            if (disable) {
                document.body.classList.add('pr-[7px]');
            } else {
                document.body.classList.remove('pr-[7px]');
            }
        }
    }

    console.log(recipe)
    return (
        <SelectedRecipeContext.Provider value={{ recipe, selectedRecipeHandler, changeURL, handleCloseRecipe, toggleScrollbars }}>
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