import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/_lib/database";
import { createRecipeService, deleteRecipeService, getPublicIdFromUrlService, getRecipeIdFromUrlService, getRecipeService, updateRecipeService, validateRecipeService } from "./services/recipeServices";
import { addRecipeToUserService, checkUserHasRecipeService } from "../profile/services/profileServices";
import { getUserService } from "../user/services/userService";
import { deleteRedisCache } from "@/_utils/redis";
import { deleteOldImageFileService } from "../cloudinary/cloudinaryService";
import { RecipeProps } from "@/_types/RecipeTypes";

export async function GET(req: NextRequest) { // Get recipe
    try {
        await connectDB();
        const user_id_header = req.headers.get('user_id');
        if (!user_id_header) throw new Error('Unauthorized');
        const recipe_id = await getRecipeIdFromUrlService(req);

        const recipe = await getRecipeService(recipe_id);

        const userHasRecipe = await checkUserHasRecipeService(user_id_header, recipe?.user._id.toString() || null);

        return NextResponse.json({ userHasRecipe, recipe }, { status: 200 });
    } catch (error) {
        console.error('Can not find recipe', error)
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) { // Add recipe
    try {
        await connectDB();
        const user_id = req.headers.get('user_id');
        if (!user_id) throw new Error('Unauthorized');
        const recipe: RecipeProps = await req.json();

        await validateRecipeService(recipe);

        await getUserService(user_id);
        const new_recipe = await createRecipeService(recipe, user_id);
        await addRecipeToUserService(new_recipe, user_id);

        await deleteRedisCache(user_id);

        return NextResponse.json({ message: "Success creating recipe" }, { status: 200 });
    } catch (error) {
        console.error("Error creating recipe:", error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) { // Update recipe
    try {
        await connectDB();
        const recipe: RecipeProps = await req.json();
        const user_id = req.headers.get('user_id');
        if (!user_id) throw new Error('Unauthorized');

        await validateRecipeService(recipe);

        await getUserService(user_id);

        await updateRecipeService(recipe);

        await deleteRedisCache(user_id);

        return NextResponse.json({ message: "Success updating recipe" }, { status: 200 });
    } catch (error) {
        console.error("Error updating recipe:", error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) { // Delete recipe
    try {
        await connectDB();

        const user_id = req.headers.get('user_id');
        if (!user_id) throw new Error('Unauthorized');

        const recipe_id = await getRecipeIdFromUrlService(req);
        const public_id = await getPublicIdFromUrlService(req);

        await getUserService(user_id);

        await Promise.all([
            (public_id && typeof public_id === 'string') && deleteOldImageFileService(public_id),
            deleteRecipeService(recipe_id)]);

        await deleteRedisCache(user_id);

        return NextResponse.json({ message: 'Recipe successfully deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}