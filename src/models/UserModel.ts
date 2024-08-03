import mongoose, { Schema, Model, Document } from 'mongoose';
import { UserContentProps, userContentSchema } from './UserContent';
import { RecipeProps, recipeSchema } from './UserRecipe';

export interface UserProps extends Document{
    _id: mongoose.Types.ObjectId,
    email: string;
    fullName: string;
    username: string;
    password: string;
    userContent?: UserContentProps;
    recipes: RecipeProps[];
}

const userSchema = new Schema<UserProps>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    userContent: {
        type: userContentSchema,
        default: {},
      },
    recipes: {
        type: [recipeSchema],
        default: [],
    }
}, {
    timestamps: true
});

export const UserModel: Model<UserProps> = mongoose.models.users || mongoose.model<UserProps>('users', userSchema);
