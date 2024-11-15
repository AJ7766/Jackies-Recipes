import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/_config/cache";
import { getUsernameFromUrlService, getUserPopulatedService } from "./services/profileServices";
import { connectDB } from "@/app/_config/database";

export async function GET(req: NextRequest) { // Get Profile
  try {
    await connectDB();

    const username = await getUsernameFromUrlService(req);
    const cached_profile = cache.get(username);

    if (cached_profile) {
      return NextResponse.json({ message: 'Success fetching profile from cache', profile: cached_profile }, { status: 200 });
    }

    const profile = await getUserPopulatedService(username);

    cache.set(username, profile);

    return NextResponse.json({ message: "Success fetching profile", profile }, { status: 200 });

  } catch (error) {
    console.error("Error getting profile:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}