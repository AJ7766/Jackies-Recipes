import { connectDB } from "@/app/config/database";
import { NextResponse } from "next/server";
import { getRecipesService } from "./services/recipesService";

export async function GET() {
    try {
        await connectDB();

        const recipes = await getRecipesService();

        return NextResponse.json({ recipes }, { status: 200 });
    } catch (error) {
        console.error('Fetch all recipes error:', error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}