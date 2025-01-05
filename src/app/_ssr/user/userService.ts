import { getUser } from "./userRepository";

export const getUserService = async (user_id: string)=> {
    const user = await getUser(user_id);

    return user;
}