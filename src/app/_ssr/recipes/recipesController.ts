import { connectDB } from "@/app/_config/database";
import { getRecipesService } from "./recipesService";
import redisClient from "@/_utils/redis";

export const getRecipesController = async () => {
    try {
        /*
        const cached_recipes = await redisClient.get('recipes');
        if (cached_recipes) {
            console.log('Cached Recipes')
            return cached_recipes;
        }*/

        await connectDB();
        const recipes = await getRecipesService();

        await redisClient.set('recipes', JSON.stringify(recipes), { EX: 600 });

        return JSON.parse(JSON.stringify(recipes));
    } catch (error) {
        console.error(error);
        throw error;
    }
}