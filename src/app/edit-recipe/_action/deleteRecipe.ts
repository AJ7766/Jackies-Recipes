import mongoose from "mongoose";

export default async function DeleteRecipe({ id, username }: { id: mongoose.Types.ObjectId, username?: string }) {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const res = await fetch(`/api/recipe?recipeId=${id.toString()}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to delete recipe: ${res.statusText}`);
            }
            console.log("deleted")
           window.location.href = `/${username}`;

        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    } else {
        return alert("You are not logged in.")
    }
}