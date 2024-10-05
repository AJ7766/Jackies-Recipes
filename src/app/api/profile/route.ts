import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server"
import { RecipeModel } from "@/models/UserRecipe";
import cache from "@/config/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  if (!username) {
    return NextResponse.json({ message: "Username is required" }, { status: 400 });
  }
  try {
    const cachedProfile = cache.get(username);

    if (cachedProfile) {
      return NextResponse.json({ message: 'Success fetching profile from cache', profileData: cachedProfile }, { status: 200 });
    }

    const profileData = await fetchProfileFromDatabase(username);

    cache.set(username, profileData);

    return NextResponse.json({ message: "Success fetching profile", profileData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Couldn't find user" }, { status: 400 });
  }
}

async function fetchProfileFromDatabase(username: string) {
  try {
    await connectDB();

    const user = await UserModel.findOne({ username })
      .select('-password -email -createdAt -updatedAt -_id -userContent._id')
      .populate({
        path: 'recipes',
        model: RecipeModel,
        select: '-__v'
      }).lean();
    if (!user) {
      throw new Error(`User not found`);
    }
    return user;

  } catch (error: any) {
    console.error("Error fetching user profile:", error); // Log specific error
    throw new Error(`Error fetching profile`);
  }
}