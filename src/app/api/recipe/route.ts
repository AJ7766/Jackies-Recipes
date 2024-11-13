import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/config/database";
import { getToken, verifyToken } from "@/utils/jwt";
import { createRecipeService, deleteRecipeService, getRecipeIdFromUrlService, getRecipeService, updateRecipeService, validateRecipeService } from "./services/recipeServices";
import { addRecipeToUserService, checkUserHasRecipeService, deleteUserRecipeService, getUserService } from "../profile/services/profileServices";
import { RecipeProps } from "@/models/RecipeModel";
import { deleteCache } from "@/app/config/cache";

export async function GET(req: NextRequest) { // Get recipe
    try {
        await connectDB();

        const recipe_id = await getRecipeIdFromUrlService(req);
        const token = await getToken(req);
        const decoded = await verifyToken(token);

        const recipe = await getRecipeService(recipe_id);

        const userHasRecipe = checkUserHasRecipeService(decoded.id, recipe?.user._id || null);

        return NextResponse.json({ userHasRecipe, recipe }, { status: 200 });
    } catch (error) {
        console.error('Can not find recipe', error)
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) { // Create recipe
    try {
        await connectDB();

        const recipe: RecipeProps = await req.json();
        const token = await getToken(req)
        const decoded = await verifyToken(token);

        await validateRecipeService(recipe);

        await getUserService(decoded.id);
        const new_recipe = await createRecipeService(recipe, decoded.id);
        await addRecipeToUserService(new_recipe, decoded.id);

        await deleteCache(decoded.username);

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
        const token = await getToken(req)
        const decoded = await verifyToken(token);

        await validateRecipeService(recipe);

        await getUserService(decoded.id);

        await updateRecipeService(recipe);

        await deleteCache(decoded.username);

        return NextResponse.json({ message: "Success updating recipe" }, { status: 200 });
    } catch (error) {
        console.error("Error updating recipe:", error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) { // Delete recipe
    try {
        await connectDB();

        const recipe_id = await getRecipeIdFromUrlService(req);
        const token = await getToken(req)
        const decoded = await verifyToken(token);

        await getUserService(decoded.id);

        await Promise.all([deleteRecipeService(recipe_id), deleteUserRecipeService(decoded.id, recipe_id)]);

        await deleteCache(decoded.username);

        return NextResponse.json({ message: 'Recipe successfully deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}