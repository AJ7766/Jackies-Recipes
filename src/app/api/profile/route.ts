import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json();
        const profileData = await fetchProfileFromDatabase(username);

        return NextResponse.json({message: "Success fetching profile", profileData }, { status: 200 });
    } catch (error:any) {
        console.error("Error in API handler:", error.message);
        return NextResponse.json({ message: "Couldn't find user", error }, { status: 400 });
    } 
    }

    async function fetchProfileFromDatabase(username: string) {
        try {
          await connectDB();
          const user = await UserModel.findOne({ username }).select('-password -email -createdAt -updatedAt -_id -userContent._id');

          if (!user) {
            throw new Error(`User not found`);
          }

          return user;
    
        } catch (error:any) {
            throw new Error(`Error fetching profile`);
        }
      }