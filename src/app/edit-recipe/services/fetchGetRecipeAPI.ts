import mongoose from "mongoose";

export const fetchGetRecipeAPI = async (recipe_id: mongoose.Types.ObjectId) => {
    try {
        const res = await fetch(`/api/recipe?recipeId=${recipe_id}`, {
            method: "GET",
        });
        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to get recipe", fetchedRecipe: null, userHasRecipe: false  }
        }
        
        return { message: "Successfully getting recipe", fetchedRecipe: data.recipe, userHasRecipe: data.userHasRecipe };
    } catch (error) {
        return { message: `Failed to get recipe: ${error}`, fetchedRecipe: null, userHasRecipe: false };
    }
}