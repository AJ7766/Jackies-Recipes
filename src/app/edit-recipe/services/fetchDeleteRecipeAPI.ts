import mongoose from "mongoose";

export async function fetchDeleteRecipeAPI(token: string, id: mongoose.Types.ObjectId) {
        try {
            const res = await fetch(`/api/recipe?recipeId=${id.toString()}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (!res.ok)
                return { message: data.message || "Failed to delete recipe", success: false };
    
            return { message: "Successfully deleting recipe", success: true };
        } catch (error) {
            return { message: `Failed to delete recipe: ${error}`, success: false };
        }
    } 