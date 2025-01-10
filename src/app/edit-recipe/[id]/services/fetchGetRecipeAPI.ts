import { getSession } from "@/_utils/session";

export const fetchGetRecipeAPI = async (recipe_id: string) => {
    try {
        const { token } = await getSession()
        const res = await fetch(process.env.NODE_ENV === 'production'
            ? `https://jackies-recipes-git-updating-ssr-jackie-huynhs-projects.vercel.app/api/recipe?recipeId=${recipe_id}`
            : `http://localhost:3000/api/recipe?recipeId=${recipe_id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await res.json();
        
        if (!res.ok) {
            return { message: data.message || "Failed to get recipe", fetchedRecipe: null, userHasRecipe: false }
        }

        return { message: "Successfully getting recipe", fetchedRecipe: data.recipe, userHasRecipe: data.userHasRecipe };
    } catch (error) {
        return { message: `Failed to get recipe: ${error}`, fetchedRecipe: null, userHasRecipe: false };
    }
}