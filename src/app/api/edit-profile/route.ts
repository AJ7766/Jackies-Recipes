import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server"
import ValidationEditSchema from "./validationEditSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  
  try {
      const { user } = await request.json()

      const email = user.email.toLowerCase();
      const username = user.username.toLowerCase();
      const fullName = user.fullName;
      const oldPassword = user.oldPassword ? user.oldPassword : "";
      const newPassword = user.newPassword ? user.newPassword : "";
      const confirmPassword = user.confirmPassword ? user.confirmPassword: "";
      const userContent = {
        profilePicture: user.userContent?.profilePicture || "",
        bio: user.userContent?.bio || "",
        instagram: user.userContent?.instagram.toLowerCase() || "",
        x: user.userContent?.x.toLowerCase() || "",
        tiktok: user.userContent?.tiktok.toLowerCase() || "",
        youtube: user.userContent?.youtube.toLowerCase() || "",
        facebook: user.userContent?.facebook.toLowerCase() || ""
      };

      const validationResponse = await ValidationEditSchema({
        _id: user._id,
        email,
        username,
        fullName,
        oldPassword,
        newPassword,
        confirmPassword,
        userContent
      });

      if (typeof validationResponse === 'string') {
        return NextResponse.json({ success: false, message: validationResponse }, { status: 400 });
      }
      
      const existingUser = await UserModel.findOne({ $or: [{ email: user.email }, { username: user.username }] });
    if (existingUser && existingUser._id.toString() !== user._id) {
      let errorMessage = '';
      if (existingUser.email === user.email) {
        errorMessage = `Email '${user.email}' is already registered.`;
      } else if (existingUser.username === user.username) {
        errorMessage = `Username '${user.username}' is already taken.`;
      }
      return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }

    const userDataForPassword = await UserModel.findOne({ _id: user._id }).select('+password');

    let processedPassword;

    if (newPassword.length === 0) {
      processedPassword = userDataForPassword?.password;
    } else {
      const saltRounds = 10;
      processedPassword = await bcrypt.hash(newPassword, saltRounds);
    }

      const updateResult = await UserModel.updateOne(
        { _id: user._id }, 
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

      if (updateResult.modifiedCount  === 0) {
        throw new Error('User not found or data unchanged');
      }
      const updatedUser = await UserModel.findOne({ _id: user._id });

      return NextResponse.json({ message: `Success!`, updatedUser}, { status: 201 })
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