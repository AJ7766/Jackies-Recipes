import { connectDB } from "@/config/database";
import { NextResponse } from "next/server";
import { RecipeModel } from "@/models/UserRecipe";
import { UserModel } from "@/models/UserModel";

export async function GET() {
    try {
        await connectDB();

        const recipes = await RecipeModel.find({})
            .populate({
                path: 'user',
                model: UserModel,
                select: '-_id username userContent.profilePicture'
            })
            .sort({ createdAt: -1 })
            .lean();

        if (recipes.length === 0) {
            return NextResponse.json({ message: "No recipes found" }, { status: 404 });
        }

        return NextResponse.json({ recipes }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}