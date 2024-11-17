import { UserModel, UserRegisterProps } from "@/_models/UserModel"

export const register = async (user: UserRegisterProps) => {
    return await UserModel.create({ email: user.email, fullName: user.fullName, username: user.username, password: user.password })
}