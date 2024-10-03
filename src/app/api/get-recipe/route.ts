import { connectDB } from "@/config/database";
import { NextRequest, NextResponse } from "next/server";
import { RecipeModel } from "@/models/UserRecipe";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const recipeId = searchParams.get('recipeId');
        const userId = searchParams.get('userId');

        const recipe = await RecipeModel.findOne({ _id: recipeId })
            .populate({
                path: 'user',
                select: '_id'
            })
            .lean();

        if (!recipe) {
            return NextResponse.json({ success: false, message: "Recipe not found" }, { status: 404 });
        }

        const isVerified = (userId === recipe.user._id.toString());

        return NextResponse.json({ success: true, isVerified: isVerified, recipe }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}