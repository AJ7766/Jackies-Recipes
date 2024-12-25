import { RecipeFormProps } from "@/_models/RecipeModel";

export const fetchPostRecipeAPI = async (recipe: RecipeFormProps) => {
    try {
        let res = await fetch("/api/recipe", {
            method: "POST",
            body: JSON.stringify(recipe),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || "Failed to create recipe", success: false };

        return { message: "Create recipe successfully", success: true };
    } catch (error) {
        return { message: `Failed to create recipe: ${error}`, success: false };
    }
}