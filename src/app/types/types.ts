import { UserContentProps, SimplifiedUserContentProps } from '@/models/UserContent';

export type ProfileProps = {
  _id?: string;
  email?: string;
  fullName?: string;
  username?: string;
  password?: string;
  userContent?: SimplifiedUserContentProps;
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
