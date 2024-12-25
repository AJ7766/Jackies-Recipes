import { RecipeFormProps } from "@/_types/RecipeModel";

export const fetchUpdateRecipeAPI = async (
    recipe: RecipeFormProps,
) => {
    try {
        let res = await fetch("/api/recipe", {
            method: "PUT",
            body: JSON.stringify(recipe),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to update recipe", success: false }
        }

        return { message: "Successfully updating recipe", success: true };
    } catch (error) {
        return { message: `Failed to updating recipe: ${error}`, success: false };
    }
}