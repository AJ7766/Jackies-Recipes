import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserContentProps, userContentSchema } from './UserContent';

export interface UserProps {
   _id: mongoose.Types.ObjectId,
   email: string;
   fullName: string;
   username: string;
   password: string;
   userContent?: UserContentProps;
   recipes: mongoose.Types.ObjectId[];
}

export interface UserDocument extends UserProps, Document{
   _id: mongoose.Types.ObjectId;
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
   }]
}, { timestamps: true });

export const UserModel: Model<UserProps> = mongoose.models.users || mongoose.model<UserProps>('users', userSchema);
