import mongoose, { Model, Schema, Document } from "mongoose";
import { UserProps } from "./UserModel";

export interface RecipeProps {
   _id: mongoose.Types.ObjectId;
   user: mongoose.Types.ObjectId;
   title: string;
   image: string;
   ingredients: IngredientListProps[];
   servings?: number;
   macros?: MacroNutrientsProps;
   instructions?: InstructionProps[];
}

export interface RecipePopulatedProps extends Omit<RecipeProps, 'user'>{
   user: UserProps;
}

export type MacroNutrientsProps = {
   carbs?: number,
   protein?: number,
   fat?: number,
   calories?: number
}

export type IngredientListProps = {
   component?: string;
   ingredients: IngredientProps[];
}

export type IngredientProps = {
   id: string;
   ingredient: string;
   amount?: number;
   unit: string;
}

export type InstructionProps = {
   id: string;
   instruction: string;
}

export const IngredientSchema = new Schema<IngredientProps>({
   id: { type: String, required: true },
   ingredient: { type: String, required: true },
   amount: { type: Number },
   unit: { type: String }
});

export const IngredientListSchema = new Schema<IngredientListProps>({
   component: { type: String },
   ingredients: [IngredientSchema]
});

export const MacroNutrientsSchema = new Schema<MacroNutrientsProps>({
   carbs: { type: Number },
   protein: { type: Number },
   fat: { type: Number },
   calories: { type: Number }
});

export const InstructionSchema = new Schema<InstructionProps>({
   id: { type: String, required: true },
   instruction: { type: String }
});

interface RecipeDocument extends RecipeProps, Document{
   _id: mongoose.Types.ObjectId;
}

export const recipeSchema = new Schema<RecipeDocument>({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
   },
   title: { type: String, required: true },
   image: { type: String },
   ingredients: [IngredientListSchema],
   servings: { type: Number },
   macros: MacroNutrientsSchema,
   instructions: [InstructionSchema]
}, { timestamps: true });

recipeSchema.index({ createdAt: 1 });

export const RecipeModel: Model<RecipeProps> = mongoose.models.recipes || mongoose.model<RecipeProps>('recipes', recipeSchema);
