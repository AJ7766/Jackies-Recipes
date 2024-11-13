import { NextRequest, NextResponse } from "next/server";
import cache from "@/app/config/cache";
import { getProfileService, getUsernameFromUrlService } from "./services/profileServices";
import { connectDB } from "@/app/config/database";

export async function GET(req: NextRequest) { //Get Profile Controller
  await connectDB();
  try {
    const username = await getUsernameFromUrlService(req);
    const cachedProfile = cache.get(username);

    if (cachedProfile) {
      return NextResponse.json({ message: 'Success fetching profile from cache', profileData: cachedProfile }, { status: 200 });
    }

    const profile = await getProfileService(username);

    cache.set(username, profile);

    return NextResponse.json({ message: "Success fetching profile", profile }, { status: 200 });

  } catch (error) {
    console.error("Error getting profile:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}