import { RegisterFormProps } from "@/app/types/types";

const isValidEmail = (email: string) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!emailRegex.test(email)) return "Please enter a valid Email address.";

   return null
};

const isValidUsername = (username: string) => {
   const usernameRegex = /^[a-zA-Z]+$/;

   if (!usernameRegex.test(username)) return "Username can only contain letters."

   if (username.length < 4) return "Username must be atleast 4 letters.";

   return null
};

const isValidPassword = (password: string, confirmPassword: string) => {
   if (password.length < 6) return "Password must be atleast 6 characters.";
   
   if (password !== confirmPassword) return "Passwords do not match.";

   return null
}

export default function ValidateRegisterForm(props: RegisterFormProps) {
   const { email, username, fullName, password, confirmPassword } = props;

   if (!email || !fullName || !username || !password || !confirmPassword) {
      const missingFields = [];
      if (!email) missingFields.push('Email');
      if (!username) missingFields.push('Username');
      if (!fullName) missingFields.push('Full Name');
      if (!password) missingFields.push('Password');
      if (!confirmPassword) missingFields.push('Confirm Password');

      console.error(`Please fill out ${missingFields.join(', ')}.`);
      return `Please fill out ${missingFields.join(', ')}.`;
   }

   const emailError = isValidEmail(email);
   if (emailError) return emailError

   const usernameError = isValidUsername(username)
   if (usernameError) return usernameError;

   const passwordError = isValidPassword(password, confirmPassword)
   if (passwordError) return passwordError;
   
   return true;
}