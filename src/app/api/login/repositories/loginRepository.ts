import { UserModel } from "@/_models/UserModel";

export const login = async(username: string) =>{
    return await UserModel.findOne({ username }).lean();
}