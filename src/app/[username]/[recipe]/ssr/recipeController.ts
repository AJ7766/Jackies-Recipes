import { connectDB } from "@/app/_config/database";
import { getRecipeMetaService } from "./recipeService";

export async function getRecipeMetaController(recipe_id: string) {
    try {
        await connectDB();

        const recipe = await getRecipeMetaService(recipe_id);

        return { fetchedRecipe: JSON.parse(JSON.stringify(recipe))}
    } catch (error) {
        console.error('Can not find recipe', error)
        return { fetchedRecipe: null, message: error }
    }
}