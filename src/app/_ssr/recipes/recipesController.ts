import { connectDB } from "@/app/_config/database";
import { getRecipesService } from "./recipesService";

export const getRecipesController = async() => {
    await connectDB();
    const recipes = await getRecipesService();

    return JSON.parse(JSON.stringify(recipes));
}