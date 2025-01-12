"use client"
import { RecipeProps } from "@/_types/RecipeTypes";
import { UserProps } from "@/_types/UserTypes";
import { Preahvihear } from "next/font/google";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedRecipeContextType {
    recipe: RecipeProps | null;
    selectedRecipeHandler: (recipe: RecipeProps, profile: UserProps) => void;
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

    const selectedRecipeHandler = (recipe: RecipeProps, profile: UserProps) => {
        if (!recipe) return null;
        changeURL(profile.username, recipe._id);
        setRecipe({
            ...recipe,
            user: profile
        })
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