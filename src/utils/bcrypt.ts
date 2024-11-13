import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
}

export const comparePasswords = async (newPassword: string, oldPassword: string) => {
    const isMatch = await bcrypt.compare(newPassword, oldPassword);
    if (!isMatch)
        throw new Error('Invalid username or password');
    
    return isMatch;
};