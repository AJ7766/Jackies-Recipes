import { NextRequest, NextResponse } from "next/server";
import { handlePost } from "./handlers/handlePost";
import { handlePut } from "./handlers/handlePut";
import { handleDelete } from "./handlers/handleDelete";
import { connectDB } from "@/app/config/database";
import { getToken, verifyToken } from "@/utils/jwt";
import { getRecipeIdFromUrlService, getRecipeService } from "./services/recipeServices";
import { checkUserHasRecipeService } from "../profile/services/profileServices";

export async function GET(req: NextRequest) { //Get recipe
    await connectDB();
    try {
        const recipe_id = await getRecipeIdFromUrlService(req);
        const token = await getToken(req);
        const decodedToken = await verifyToken(token);
        const user_id = decodedToken.id;

        const recipe = await getRecipeService(recipe_id);

        const userHasRecipe = checkUserHasRecipeService(user_id, recipe?.user._id && recipe.user._id || null);

        return NextResponse.json({ userHasRecipe, recipe }, { status: 200 });
    } catch (error) {
        console.error('Can not find recipe', error)
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        return await handlePost(request);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        return await handlePut(request);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        return await handleDelete(request);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}