export type ProfileProps = {
  username?: string;
  email?: string;
};

export type RegisterFormProps = {
  email: string;
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}