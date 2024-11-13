import { connectDB } from "@/app/config/database";
import { NextRequest, NextResponse } from "next/server";
import { RecipeModel } from "@/models/UserRecipe";
import { verifyToken } from "@/utils/jwt";

export async function handleGet(request: NextRequest) {
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const recipeId = searchParams.get('recipeId');
        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken(token);
        const userId = decoded.id;

        const recipe = await RecipeModel.findOne({ _id: recipeId })
            .populate({
                path: 'user',
                select: '_id'
            })
            .lean();

        if (!recipe) {
            return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
        }

        const isVerified = (userId === recipe.user._id.toString());

        return NextResponse.json({ isVerified: isVerified, recipe }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}