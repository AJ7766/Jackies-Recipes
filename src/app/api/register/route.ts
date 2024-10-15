import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../config/database"
import { UserModel } from "../../../models/UserModel"
import bcrypt from "bcrypt";
import ValidateRegisterForm from "./validateForm";
import { RegisterFormProps } from "@/app/types/types";

export async function POST(request: NextRequest) {
   try {
      const { email, fullName, username, password, confirmPassword }: RegisterFormProps = await request.json()
      const lowercaseUsername = username.toLowerCase();
      const lowercaseEmail = email.toLowerCase();

      const validationResponse = ValidateRegisterForm({ email: lowercaseEmail, fullName, username: lowercaseUsername, password, confirmPassword });

      if (typeof validationResponse === 'string') {
         return NextResponse.json({ message: validationResponse }, { status: 400 });
      }

      await connectDB();

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await UserModel.create({ email: lowercaseEmail, fullName, username: lowercaseUsername, password: hashedPassword })

      return NextResponse.json({ message: `Your account ${email} has been successfully created!` }, { status: 201 })
   } catch (error: any) {
      let errorMessage = "Failed to register user.";

      if (error.code === 11000) {
         if (error.keyPattern.email) {
            errorMessage = `Email '${error.keyValue.email}' is already registered.`;
         } else if (error.keyPattern.username) {
            errorMessage = `Username '${error.keyValue.username}' is already taken.`;
         }
      }
      console.error("Error:", errorMessage, error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
   }
}