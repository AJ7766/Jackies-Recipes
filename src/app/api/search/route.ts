import { connectDB } from "@/app/config/database";
import { NextRequest, NextResponse } from "next/server";
import { getSearchedRecipesService, getSearchedUsersService, getSearchFromUrlService } from "./services/searchService";

export async function GET(req: NextRequest) { // Get searched users & recipes
    try {
        await connectDB();

        const search = await getSearchFromUrlService(req);

        const regex = new RegExp(search, 'i');

        const [searchedUsers, searchedRecipes] = await Promise.all([
            getSearchedUsersService(search),
            getSearchedRecipesService(search)
        ])

        return NextResponse.json({ searchedUsers, searchedRecipes}, { status: 200 }); 
    }catch(error){
        console.error('Error fetching search:', error);
        return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
    }
}