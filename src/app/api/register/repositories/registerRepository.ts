import { UserModel } from "@/_models/UserModel"
import { UserRegisterProps } from "@/_types/UserTypes"

export const register = async (user: UserRegisterProps) => {
    return await UserModel.create({ email: user.email, fullName: user.fullName, username: user.username, password: user.password })
}