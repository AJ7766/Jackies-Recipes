import { UserContentProps } from '@/models/UserModel';
import mongoose from 'mongoose';

export type EditFormProps = {
  _id?: mongoose.Types.ObjectId;
  email?: string;
  username?: string;
  fullName?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  userContent?: UserContentProps;
  recipes?: SimplifiedRecipeProps[]; 
}

export type ProfileProps = {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  fullName?: string;
  username?: string;
  password?: string;
  userContent?: UserContentProps;
  recipes: SimplifiedRecipeProps[]; 
};