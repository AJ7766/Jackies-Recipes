import { connectDB } from "@/_lib/database";
import { getRecipeService } from "./recipeService";

export const getRecipeController = async (recipe_id: string) => {
    try {
        await connectDB();
        const recipe = await getRecipeService(recipe_id);
        
        return JSON.parse(JSON.stringify(recipe));
    } catch (error) {
        console.error(error);
        throw error;
    }
}