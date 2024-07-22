import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../config/database"
import { UserModel } from "../../../models/UserModel"
import bcrypt from "bcrypt";
import ValidateRegisterForm from "./validateForm";
import { RegisterFormProps } from "@/app/types/types";

export async function POST(request: NextRequest) {
  try {
      const { email, fullName, username, password, confirmPassword }: RegisterFormProps = await request.json()
      const validationResponse = ValidateRegisterForm({ email, fullName, username, password, confirmPassword });

      if (typeof validationResponse === 'string') {
        return NextResponse.json({ success: false, message: validationResponse }, { status: 400 });
      }
      
      await connectDB()

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await UserModel.create({ email, fullName, username, password: hashedPassword })  

      return NextResponse.json({ message: `Your account ${email} has been successfully created!` }, { status: 201 })
  } catch (err:any) {
      console.error(err)
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