import { UserRegisterProps } from "@/_types/UserTypes";
import { register } from "../repositories/registerRepository";
import { hashPassword } from "@/_utils/bcrypt";

export const registerService = async (user: UserRegisterProps) => {
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
}