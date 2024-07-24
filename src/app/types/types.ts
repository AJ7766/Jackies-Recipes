import { UserContentProps } from '@/models/UserContent';

export type ProfileProps = {
  email?: string;
  fullName?: string;
  username?: string;
  password?: string;
  userContent?: UserContentProps;
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
