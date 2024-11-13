import { RegisterFormProps } from "@/models/UserModel";
import ValidateRegisterForm from "../validations/registerValidation";
import { register } from "../repositories/registerRepository";
import { hashPassword } from "@/utils/bcrypt";

export const registerService = async (user: RegisterFormProps) => {
    const lowercaseUsername = user.username.toLowerCase();
    const lowercaseEmail = user.email.toLowerCase();

    const hashedPassword = await hashPassword(user.password);

    const updated_user = {
        ...user,
        email: lowercaseEmail,
        username: lowercaseUsername,
        password: hashedPassword
    };

    const new_user = await register(updated_user);

    if (!new_user)
        throw new Error('Failed to register user');

    return new_user;
};


export const registerValidateService = async (user: RegisterFormProps) => {
    const validation_response = await ValidateRegisterForm(user);

    if (typeof validation_response === 'string')
        throw new Error(validation_response);

    return validation_response;
}