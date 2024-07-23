import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserContentProps extends Document {
    profilePicture?: string;
    bio?: string;
    instagram?: string;
    x?: string; // formerly known as Twitter
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  }
  
  const userContentSchema = new Schema<UserContentProps>({
    profilePicture: { type: String },
    bio: { type: String },
    instagram: { type: String },
    x: { type: String },
    tiktok: { type: String },
    youtube: { type: String },
    facebook: { type: String },
  }, {
    timestamps: true
  });

export const UserContentModel: Model<UserContentProps> = mongoose.models.userContents || mongoose.model<UserContentProps>('userContents', userContentSchema);