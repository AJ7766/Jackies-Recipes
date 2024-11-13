import { login } from "../repositories/loginRepository"

export const loginServices = async (username: string) => {
    const user = await login(username);
    
    if (!user)
        throw new Error('Invalid username or password');

    return user;
}