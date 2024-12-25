import { RecipeProps } from "./RecipeModel";

export interface UserProps {
   _id: string,
   email: string;
   fullName: string;
   username: string;
   password: string;
   userContent?: UserContentProps;
   recipes?: RecipeProps[];
   followers?: string[];
   following?: string[];
}

export interface UserEditProps extends Omit<UserProps, '_id' | 'recipes'> {
   newPassword: string;
   confirmPassword: string;
}

export interface UserRegisterProps extends Omit<UserProps, '_id'> {
   isChecked: boolean;
   confirmPassword: string;
}

export interface UserContentProps {
   profilePicture?: string;
   bio?: string;
   instagram?: string;
   x?: string;
   tiktok?: string;
   youtube?: string;
   facebook?: string;
}