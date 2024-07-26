import { EditFormProps} from "@/app/types/types";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcrypt";
import imageSize from "image-size";

export default async function ValidationEditSchema(props: EditFormProps){
    const { _id, email, username, fullName, oldPassword, newPassword, confirmPassword, userContent } = props;

    let errorMessage = "";

    const profilePictureError = isValidProfilePicture(userContent?.profilePicture || "");
    if (profilePictureError) {
        errorMessage = profilePictureError;
        return errorMessage
    }

    const emailError = isValidEmail(email || "");
    if (emailError) {
        errorMessage = emailError;
        return errorMessage
    }

    const usernameError = isValidUsername(username || "")
    if (usernameError) {
        errorMessage = usernameError;
        return errorMessage;
    }

    const fullNameError = isValidFullName(fullName || "")
    if (fullNameError) {
        errorMessage = fullNameError;
        return errorMessage;
    }

    const instagramError = isValidInstagram(userContent?.instagram|| "")
    if(instagramError){
      errorMessage = instagramError;
      return errorMessage;
    }
    
    const xError = isValidX(userContent?.x || "");
  if (xError) {
    errorMessage = xError;
    return errorMessage;
  }

  const tiktokError = isValidTikTok(userContent?.tiktok || "");
  if (tiktokError) {
    errorMessage = tiktokError;
    return errorMessage;
  }

  const youtubeError = isValidYouTube(userContent?.youtube || "");
  if (youtubeError) {
    errorMessage = youtubeError;
    return errorMessage;
  }

  const facebookError = isValidFacebook(userContent?.facebook || "");
  if (facebookError) {
    errorMessage = facebookError;
    return errorMessage;
  }

    //password vali
    const user = await UserModel.findOne({ _id: _id }).select('+password');
    if (!user) {
      return console.log("user not found");
    }

    if (oldPassword === undefined) {
      throw new Error('Old password is required');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    
    const passwordError = isValidPassword(newPassword || "", confirmPassword || "")
    if (passwordError) {
      if (!isMatch) {
        errorMessage = 'Old password does not match';
        return errorMessage;
        }
        errorMessage= passwordError;
        return errorMessage;
    }
    
    return true;
 }
 
 
 const isValidProfilePicture = (profilePicture: string) => {
  const MAX_SIZE = 20 * 1024 * 1024; 
  // Extract the data part of the base64 string
  if (!profilePicture) {
    return 'Invalid Base64 string.';
  }

  const base64Data = profilePicture.split(';base64,').pop();
  if (!base64Data) {
    return 'Invalid Base64 data.';
  }
  
  const buffer = Buffer.from(base64Data, 'base64');
  console.log(buffer.length);
  if (buffer.length > MAX_SIZE) {
    return 'Image size exceeds 20MB.';
  }
  return null;
};

 const isValidEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid Email address";
      }
    return null
  };

const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z]+$/;
    if(!usernameRegex.test(username)){
      const errorMsg = "Username can only contain letters"
      return errorMsg
    }
    if(username.length < 4){
      const errorMsg = "Username must be atleast 4 letters"
      return errorMsg;
    }
    return null
};

const isValidFullName = (fullName: string) => {
  const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if(!nameRegex.test(fullName)){
      const errorMsg = "Name can only contain letters"
      return errorMsg
    }
    return null
};

const isValidInstagram = (instagram: string) => {
  if(instagram.length > 1 && !instagram.includes("instagram.com")){
    const errorMsg = "Link must be from Instagram"
    return errorMsg
  }
  return null
};

const isValidX = (x: string) => {
  if (x.length > 1 && !x.includes("x.com")) {
    const errorMsg = "Link must be from X (Twitter)";
    return errorMsg;
  }
  return null;
};

const isValidTikTok = (tiktok: string) => {
  if (tiktok.length > 1 && !tiktok.includes("tiktok.com")) {
    const errorMsg = "Link must be from TikTok";
    return errorMsg;
  }
  return null;
};

// YouTube Validation
const isValidYouTube = (youtube: string) => {
  if (youtube.length > 1 && !youtube.includes("youtube.com")) {
    const errorMsg = "Link must be from YouTube";
    return errorMsg;
  }
  return null;
};

// Facebook Validation
const isValidFacebook = (facebook: string) => {
  if (facebook.length > 1 && !facebook.includes("facebook.com")) {
    const errorMsg = "Link must be from Facebook";
    return errorMsg;
  }
  return null;
};

const isValidPassword = (newPassword:string, confirmPassword: string) => {
  if (newPassword.length > 0 && newPassword.length < 6) {
    const errorMsg = "Password must be atleast 6 characters"
    return errorMsg
  }

  if(newPassword !== confirmPassword){
    const errorMsg = "Passwords do not match"
    return errorMsg;
  }
  return null
}