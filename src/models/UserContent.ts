import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserContentProps extends Document {
    profilePicture?: string;
    bio?: string;
    instagram?: string;
    x?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  }
  
  export type SimplifiedUserContentProps = {
    profilePicture?: string;
    bio?: string;
    instagram?: string;
    x?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  };  

 export const userContentSchema = new Schema<UserContentProps>({
    profilePicture: { type: String },
    bio: { type: String },
    instagram: { type: String },
    x: { type: String },
    tiktok: { type: String },
    youtube: { type: String },
    facebook: { type: String },
  });

export const UserContentModel: Model<UserContentProps> = mongoose.models.userContents || mongoose.model<UserContentProps>('userContents', userContentSchema);
