import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server"
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export async function POST(request: NextRequest) {

    try {
        const { username } = await request.json();

        const cachedProfile = cache.get(username);

        if (cachedProfile) {
          console.log(`cached: ${username}`)
          return NextResponse.json({ message: 'Success fetching profile from cache', profileData: cachedProfile }, { status: 200 });
        }

        const profileData = await fetchProfileFromDatabase(username);

        cache.set(username, profileData);

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