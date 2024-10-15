import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { connectDB } from "@/config/database";
import cache from "@/config/cache";
import userValidation from "../validations/userValidation";
import { verifyToken } from "@/config/jwt";

export async function handlePut(request: NextRequest) {
  const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);
    const userId = decoded.id;
    const { user } = await request.json()

    const email = user.email.toLowerCase();
    const username = user.username.toLowerCase();
    const fullName = user.fullName;
    const oldPassword = user.oldPassword ? user.oldPassword : "";
    const newPassword = user.newPassword ? user.newPassword : "";
    const confirmPassword = user.confirmPassword ? user.confirmPassword : "";
    const userContent = {
      profilePicture: user.userContent?.profilePicture || "",
      bio: user.userContent?.bio || "",
      instagram: user.userContent?.instagram.toLowerCase() || "",
      x: user.userContent?.x.toLowerCase() || "",
      tiktok: user.userContent?.tiktok.toLowerCase() || "",
      youtube: user.userContent?.youtube.toLowerCase() || "",
      facebook: user.userContent?.facebook.toLowerCase() || ""
    };

    const validationResponse = await userValidation({
      _id: userId,
      email,
      username,
      fullName,
      oldPassword,
      newPassword,
      confirmPassword,
      userContent
    });

    if (typeof validationResponse === 'string') {
      return NextResponse.json({ message: validationResponse }, { status: 400 });
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ $or: [{ email: user.email }, { username: user.username }] }).lean();

    if (existingUser && existingUser._id.toString() !== userId) {
      let errorMessage = '';
      if (existingUser.email === user.email) {
        errorMessage = `Email '${user.email}' is already registered.`;
      } else if (existingUser.username === user.username) {
        errorMessage = `Username '${user.username}' is already taken.`;
      }
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const userDataForPassword = await UserModel.findOne({ _id: userId }).select('+password').lean();

    let processedPassword;

    if (newPassword.length === 0) {
      processedPassword = userDataForPassword?.password;
    } else {
      const saltRounds = 10;
      processedPassword = await bcrypt.hash(newPassword, saltRounds);
    }

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          email,
          username,
          fullName,
          password: processedPassword,
          'userContent.bio': userContent.bio,
          'userContent.instagram': userContent.instagram,
          'userContent.x': userContent.x,
          'userContent.tiktok': userContent.tiktok,
          'userContent.youtube': userContent.youtube,
          'userContent.facebook': userContent.facebook,
          'userContent.profilePicture': userContent.profilePicture,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error('User not found or data unchanged');
    }
    const updatedUser = await UserModel.findOne({ _id: userId }).lean();

    if (updatedUser?.username) {
      cache.del(updatedUser.username);
    }

    return NextResponse.json({ message: `Success!` }, { status: 201 })
  } catch (error: any) {
    console.error('Error', error)
    let errorMessage = "Failed to register user.";

    if (error.code === 11000) {
      if (error.keyPattern.email) {
        errorMessage = `Email '${error.keyValue.email}' is already registered.`;
      } else if (error.keyPattern.username) {
        errorMessage = `Username '${error.keyValue.username}' is already taken.`;
      }
    }
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}