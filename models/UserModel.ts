import mongoose, { Schema, Model, Document } from 'mongoose';

export interface UserProps extends Document{
    email: string;
    fullName: string;
    username: string;
    password: string;
}

const userSchema = new Schema<UserProps>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

export const UserModel: Model<UserProps> = mongoose.models.users || mongoose.model<UserProps>('users', userSchema);
