import mongoose, { Model, Schema } from "mongoose";
import { IngredientListProps, IngredientListSchema, InstructionProps, InstructionSchema, MacroNutrientsProps, MacroNutrientsSchema } from "./UserRecipe";

interface UserProps extends Document {
    username: string;
    profilePicture?: string;
}

export interface RecipeProps extends Document {
    _id: mongoose.Types.ObjectId;
    user: UserProps;
    title: string;
    image?: string;
    ingredients: IngredientListProps[];
    servings?: number;
    macros?: MacroNutrientsProps;
    instructions?: InstructionProps[];
}

export interface RecipesListProps extends Document {
    recipes: RecipeProps[];
}

export const userSchema = new Schema<UserProps>({
    username: {type: String, unique: true},
    profilePicture: {type: String}
})

export const recipeSchema = new Schema<RecipeProps>({
    title: { type: String, required: true },
    user: {
        type: userSchema,
        default: {}
    },
    image: { type: String },
    ingredients: [IngredientListSchema],
    servings: { type: Number },
    macros: MacroNutrientsSchema,
    instructions: [InstructionSchema],
},
{
    timestamps: true
});

export const RecipeModel: Model<RecipeProps> = mongoose.models.recipes || mongoose.model<RecipeProps>('recipes', recipeSchema);
