import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../_config/database"
import { registerService, registerValidateService } from "./services/registerServices";
import { UserRegisterProps } from "@/_models/UserModel";

export async function POST(req: NextRequest) { // Register user
   try {
      await connectDB();
      const user: UserRegisterProps = await req.json();

      await registerValidateService(user);

      await registerService(user);

      return NextResponse.json({ message: `Your account ${user.email} has been successfully created!` }, { status: 201 })
   } catch (error: any) {
      if (error.code === 11000) {
         if (error.keyPattern.email) {
            error.message = `Email '${error.keyValue.email}' is already registered.`;
         } else if (error.keyPattern.username) {
            error.message = `Username '${error.keyValue.username}' is already taken.`;
         }
      }
      console.error("Register Error:", error);
      return NextResponse.json({ message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
   }
}