import { UserContentProps, UserProps } from '@/_types/UserTypes';
import mongoose, { Schema, Model, Document } from 'mongoose';

const userContentSchema = new Schema<UserContentProps>({
   profilePicture: { type: String, default: null },
   bio: { type: String, default: null },
   instagram: { type: String, default: null },
   x: { type: String, default: null },
   tiktok: { type: String, default: null },
   youtube: { type: String, default: null },
   facebook: { type: String, default: null },
}, { _id: false }
);

interface UserDocument extends UserProps, Document {
   _id: string;
}

const userSchema = new Schema<UserDocument>({
   email: { type: String, required: true, unique: true },
   username: { type: String, required: true, unique: true, index: true },
   fullName: { type: String, required: true },
   password: { type: String, required: true },
   userContent: {
      type: userContentSchema,
      default: {},
   },
   recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipes'
   }],
   followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   }],
   following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
   }],
}, { timestamps: true });

userSchema.index({ recipes: 1 });

export const UserModel: Model<UserProps> = mongoose.models.users || mongoose.model<UserProps>('users', userSchema);