export async function fetchDeleteRecipeAPI(id: string, public_id: string) {
        try {
            const res = await fetch(`/api/recipe?recipeId=${id.toString()}&public_id=${public_id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (!res.ok)
                return { message: data.message || "Failed to delete recipe", success: false };
    
            return { message: "Successfully deleting recipe", success: true };
        } catch (error) {
            return { message: `Failed to delete recipe: ${error}`, success: false };
        }
    } 