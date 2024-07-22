import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { username } = await request.json();
        const profileData = await fetchProfileFromDatabase(username);

        return NextResponse.json(profileData, { status: 200 });
    } catch (error:any) {
        console.error("Error in API handler:", error.message);
        return NextResponse.json({ message: "Couldn't find user", error }, { status: 400 });
    } finally{
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log("MongoDB closed");
          }
    }
    }

    async function fetchProfileFromDatabase(username: string) {
        try {
          await connectDB();
          const user = await UserModel.findOne({ username });
            if (!user) {
            throw new Error(`User not found`);
          }

          const profileData = {
            username: user.username,
            fullName: user.fullName,
          };
          return profileData;
    
        } catch (error:any) {
            throw new Error(`Error fetching profile`);
        }
      }