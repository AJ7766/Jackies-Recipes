"use client"
import { RecipeProps } from "@/_types/RecipeTypes";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from 'react';

interface SelectedRecipeContextType {
    recipe: RecipeProps | null;
    selectedRecipeHandler: (recipe: RecipeProps | null) => void;
    changeURL: (username: string, recipe_id: string) => void;
    handleCloseRecipe: () => void;
    toggleScrollbars: (disable: boolean) => void;
}

const SelectedRecipeContext = createContext<SelectedRecipeContextType | undefined>(undefined);

const changeURL = (username: string, recipe_id: string) => {
    window.history.pushState({}, '', `/${username}/${recipe_id}`);
};

const handleCloseRecipe = () => {
    window.history.back();
}

export const SelectedRecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipe, setRecipe] = useState<RecipeProps | null>(null);

    const selectedRecipeHandler = (recipe: RecipeProps | null) => {
        if (!recipe) return null;
        changeURL(recipe.user.username, recipe._id);
        setRecipe(recipe);
    }

    const toggleScrollbars = (disable: boolean) => {
        if (disable) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setRecipe(null);
        }

        if (window.innerWidth > 1024) {
            if (disable) {
                document.body.style.paddingRight = '7px';
            } else {
                document.body.style.paddingRight = '';
            }
        }
    };


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