import { UserModel } from "@/models/UserModel";
import { RecipeModel } from "@/models/UserRecipe";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function DELETE(request: NextRequest) {
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        const userId = decoded.id;
        console.log(userId)
        const url = new URL(request.url);
        const recipeId = url.pathname.split('/').pop();

        if (!recipeId || !mongoose.isValidObjectId(recipeId)) {
            return NextResponse.json({ message: 'Invalid Recipe ID' }, { status: 400 });
        }

        const user = await UserModel.findOne({ _id: userId });
        console.log(user?.username, user?._id)
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const recipeObjectId = new mongoose.Types.ObjectId(recipeId);

        const recipeIndex = user.recipes.findIndex(recipe => recipe._id.toString() === recipeObjectId.toString());
        if (recipeIndex === -1) {
            throw new Error('Recipe not found');
        }

        const recipeExists = user.recipes.some(recipe => recipe._id.equals(recipeObjectId));
        if (!recipeExists) {
            return NextResponse.json({ message: "Recipe not found or not authorized to delete" }, { status: 404 });
        }

        const updatedList = user.recipes.filter(recipe => recipe._id.toString() !== recipeObjectId.toString());
        console.log(updatedList)
        await user.save();
        return NextResponse.json({ message: 'Recipe successfully deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Token not valid or other error occurred' }, { status: 401 });
    }
}