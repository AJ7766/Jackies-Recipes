import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../../config/database"
import { UserModel } from "../../../../models/UserModel"

export async function POST(request: NextRequest) {
  try {
      const { username, password } = await request.json()
      await connectDB()
      await UserModel.create({ username, password })
      await mongoose.connection.close()
      
      return NextResponse.json({ message: `Your account ${email} has been successfully created!` }, { status: 201 })
  } catch (err:any) {
      console.error(err)
      await mongoose.connection.close()
    let errorMessage = "Failed to register user.";
    
    if (err.code === 11000) {
      if (err.keyPattern.email) {
        errorMessage = `Email '${err.keyValue.email}' is already registered.`;
      } else if (err.keyPattern.username) {
        errorMessage = `Username '${err.keyValue.username}' is already taken.`;
      }
    }
    
    return NextResponse.json({ message: errorMessage }, { status: 400 });  }
}