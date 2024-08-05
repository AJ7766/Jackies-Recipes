import { useAuth } from "@/app/context/AuthContext";
import mongoose from "mongoose";

export default async function DeleteRecipe({ id, username }: { id: mongoose.Types.ObjectId, username?: string }) {
    const token = localStorage.getItem('token');
    if(token){
    try {
        const res = await fetch(`/api/delete-recipe/${id.toString()}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete recipe: ${res.statusText}`);
        }
        else if(res.ok){
            window.location.href = `/${username}`;
        }
    } catch (error) {
        console.error("Error deleting recipe:", error);
        // Handle the error as needed, e.g., show a notification to the user
    }
}else{
    return alert("You are not logged in.")
}
}