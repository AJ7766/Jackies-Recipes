import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "../../../config/database"
import { UserModel } from "../../../models/UserModel"

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    // If the password matches, return the user data (excluding the password for security)
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;

  } catch (error) {
    console.error('Error checking login details:', error.message);
    throw error;
  } finally {
    mongoose.connection.close();
  }
}
}