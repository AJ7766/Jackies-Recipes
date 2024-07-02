import mongoose, { Schema, Model } from 'mongoose';

export interface UserProps {
    email: string;
    fullName: string;
    username: string;
    password: string;
}

const userSchema = new Schema<UserProps>({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

export const UserModel: Model<UserProps> = mongoose.models.users || mongoose.model<UserProps>('users', userSchema);