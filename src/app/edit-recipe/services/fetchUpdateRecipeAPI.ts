import { RecipeFormProps } from "@/_models/RecipeModel";

export const fetchUpdateRecipeAPI = async (
    token: string,
    recipe: RecipeFormProps,
    deleteCachedUser: () => void
) => {
    try {
        let res = await fetch("/api/recipe", {
            method: "PUT",
            body: JSON.stringify(recipe),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to update recipe", success: false }
        }

        deleteCachedUser();

        return { message: "Successfully updating recipe", success: true };
    } catch (error) {
        return { message: `Failed to updating recipe: ${error}`, success: false };
    }
}