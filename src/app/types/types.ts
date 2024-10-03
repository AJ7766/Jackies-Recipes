import { UserContentProps, SimplifiedUserContentProps } from '@/models/UserContent';
import { SimplifiedRecipeProps } from '@/models/UserRecipe';
import mongoose from 'mongoose';

export type ProfileProps = {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
  fullName?: string;
  username?: string;
  password?: string;
  userContent?: SimplifiedUserContentProps;
  recipes: mongoose.Types.ObjectId[]; 
};

export type ProfilePropsOrNull = ProfileProps | null;

export type RegisterFormProps = {
  email: string;
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  userContent?: UserContentProps;
}

export type EditFormProps = {
  _id?: mongoose.Types.ObjectId;
  email?: string;
  username?: string;
  fullName?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  userContent?: SimplifiedUserContentProps;
  recipes?: SimplifiedRecipeProps[]; 
}