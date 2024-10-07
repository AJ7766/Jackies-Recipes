import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import cache from "@/config/cache";
import { verifyToken } from "@/config/jwt";
import { RecipeModel } from "@/models/UserRecipe";

export async function handleDelete(request: NextRequest) {
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken(token);
        const userId = decoded.id;

        const { searchParams } = new URL(request.url);
        const recipeId = searchParams.get('recipeId');

        if (!recipeId || !mongoose.isValidObjectId(recipeId)) {
            return NextResponse.json({ message: 'Invalid Recipe ID' }, { status: 400 });
        }
        await connectDB();
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const deleteRecipePromise = RecipeModel.deleteOne({ _id: recipeId });
        const updateUserPromise = UserModel.updateOne(
            { _id: userId },
            { $pull: { recipes: recipeId } }
        );

        const [deleteResult, updateUserResult] = await Promise.all([deleteRecipePromise, updateUserPromise]);

        if (deleteResult.deletedCount !== 1) {
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }

        if (updateUserResult.modifiedCount === 0) {
            console.log('Failed to remove recipe from user, or recipe not found in user.');
        } else {
            console.log('Recipe successfully deleted and removed from user.');
        }

        cache.del(user.username);

        return NextResponse.json({ message: 'Recipe successfully deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Token not valid or other error occurred' }, { status: 401 });
    }
}