import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../config/database"
import { UserModel } from "../../../models/UserModel"

export async function POST(request: NextRequest) {
  try {
      const { user, test } = await request.json()
      console.log(test);
      
      return NextResponse.json({ message: `Success!` }, { status: 201 })
  } catch (err:any) {
    return NextResponse.json({ message: err.message }, { status: 400 });  }
}