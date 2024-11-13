import { RegisterFormProps, UserModel } from "@/models/UserModel"

export const register = async (user: RegisterFormProps) => {
    return await UserModel.create({ email: user.email, fullName: user.fullName, username: user.username, password: user.password })
}