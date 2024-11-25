import { NextRequest, NextResponse } from "next/server";
import { getUsernameFromUrlService, getUserPopulatedService } from "./services/profileServices";
import { connectDB } from "@/app/_config/database";

export async function GET(req: NextRequest) { // Get Profile
  try {
    await connectDB();

    const username = await getUsernameFromUrlService(req);

    const profile = await getUserPopulatedService(username);

    return NextResponse.json({ message: "Success fetching profile", profile }, { status: 200 });

  } catch (error) {
    console.error("Error getting profile:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}