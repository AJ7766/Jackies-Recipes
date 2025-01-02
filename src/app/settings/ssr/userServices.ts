import { UserEditProps } from "@/_types/UserTypes";
import { getUser } from "./userRespository";

export const getUserService = async (user_id: string): Promise<UserEditProps> => {
    const user = await getUser(user_id);

    if (!user) 
        throw new Error(`User not found`);
    
    return user;
}