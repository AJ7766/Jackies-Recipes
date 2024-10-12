import { connectDB } from "@/config/database";
import { NextResponse } from "next/server";
import { RecipeModel } from "@/models/UserRecipe";

export async function GET() {
    try {
        await connectDB();

        const recipes = await RecipeModel.find({})
            .populate({
                path: 'user',
                select: 'username userContent.profilePicture'
            })
            .lean();

        if (recipes.length === 0) {
            return NextResponse.json({ message: "No recipes found" }, { status: 404 });
        }

        return NextResponse.json({ recipes }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}