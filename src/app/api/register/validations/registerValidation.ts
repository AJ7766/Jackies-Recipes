import { RegisterFormProps } from "@/models/UserModel";

const checkIfChecked = async (isChecked: boolean) => {
   if (!isChecked)
      throw new Error("You must accept the User Account Policy to register");

   return null
}

const isValidEmail = async (email: string) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(email))
      throw new Error("Please enter a valid Email address")

   return null
};

const isValidUsername = async (username: string) => {
   const usernameRegex = /^[a-zA-Z]+$/;

   if (!usernameRegex.test(username))
      throw new Error("Username can only contain letters");

   if (username.length < 4)
      throw new Error("Username must be atleast 4 letters");

   return null
};

const isValidPassword = async (password: string, confirmPassword: string) => {
   if (password.length < 6)
      throw new Error("Password must be atleast 6 characters");

   if (password !== confirmPassword)
      throw new Error("Passwords do not match");

   return null
}

export default async function ValidateRegisterForm(user: RegisterFormProps) {
   const { isChecked, email, username, fullName, password, confirmPassword } = user;

   if (!email || !fullName || !username || !password || !confirmPassword) {
      const missingFields = [];
      if (!email) missingFields.push('Email');
      if (!username) missingFields.push('Username');
      if (!fullName) missingFields.push('Full Name');
      if (!password) missingFields.push('Password');
      if (!confirmPassword) missingFields.push('Confirm Password');

      throw new Error(`Please fill out ${missingFields.join(', ')}.`);
   }

   await checkIfChecked(isChecked);
   await isValidEmail(email);
   await isValidUsername(username);
   await isValidPassword(password, confirmPassword);

   return true;
}