import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import { RecipeModel } from "@/models/UserRecipe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        if (!search) {
            return NextResponse.json({ success: false, message: "Search term is required." }, { status: 400 });
        }

        const regex = new RegExp(search, 'i');

        await connectDB();
        const existingUsers = await UserModel.find({ username: { $regex: regex } }).limit(5).select('-_id username fullName userContent.profilePicture').lean();

        const existingRecipes = await RecipeModel.find({ title: { $regex: regex } }).populate('user', 'username').limit(5).select('_id title image').lean();

        return NextResponse.json({ success: true, existingUsers: existingUsers, existingRecipes: existingRecipes}, { status: 200 }); 
    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error'}, { status: 500 });
    }
}