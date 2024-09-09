import { RegisterFormProps } from "@/app/types/types";


const isValidEmail = (email: string) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
      return "Please enter a valid Email address.";
   }
   return null
};

const isValidUsername = (username: string) => {
   const usernameRegex = /^[a-zA-Z]+$/;
   if (!usernameRegex.test(username)) {
      const errorMsg = "Username can only contain letters."
      return errorMsg
   }
   if (username.length < 4) {
      const errorMsg = "Username must be atleast 4 letters."
      return errorMsg;
   }
   return null
};

const isValidPassword = (password: string, confirmPassword: string) => {
   if (password.length < 6) {
      const errorMsg = "Password must be atleast 6 characters."
      return errorMsg
   }
   if (password !== confirmPassword) {
      const errorMsg = "Passwords do not match."
      return errorMsg;
   }
   return null
}

export default function ValidateRegisterForm(props: RegisterFormProps) {
   const { email, username, fullName, password, confirmPassword } = props;
   let errorMessage = "";

   if (!email || !fullName || !username || !password || !confirmPassword) {
      const missingFields = [];
      if (!email) missingFields.push('Email');
      if (!username) missingFields.push('Username');
      if (!fullName) missingFields.push('Full Name');
      if (!password) missingFields.push('Password');
      if (!confirmPassword) missingFields.push('Confirm Password');

      errorMessage = `Please fill out ${missingFields.join(', ')}.`;

      console.error(errorMessage);
      return errorMessage;
   }

   const emailError = isValidEmail(email);
   if (emailError) {
      errorMessage = emailError;
      return errorMessage
   }

   const usernameError = isValidUsername(username)
   if (usernameError) {
      errorMessage = usernameError;
      return errorMessage;
   }

   const passwordError = isValidPassword(password, confirmPassword)
   if (passwordError) {
      errorMessage = passwordError;
      return errorMessage;
   }
   return true;
}