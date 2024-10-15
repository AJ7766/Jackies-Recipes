import { ProfileProps } from "@/app/types/types";
import mongoose, { Model, Schema } from "mongoose";

export interface RecipeProps extends Document {
   _id: mongoose.Types.ObjectId;
   user: mongoose.Types.ObjectId;
   title: string;
   image: string;
   ingredients: IngredientListProps[];
   servings?: number;
   macros?: MacroNutrientsProps;
   instructions?: InstructionProps[];
}

export type SimplifiedRecipeProps = {
   _id?: mongoose.Types.ObjectId;
   user: ProfileProps;
   title: string;
   image: string;
   ingredients: IngredientListProps[];
   servings?: number;
   macros?: MacroNutrientsProps;
   instructions?: InstructionProps[];
};

export type SimplifiedRecipePropsNoUser = {
   _id?: mongoose.Types.ObjectId;
   title: string;
   image: string;
   ingredients: IngredientListProps[];
   servings?: number;
   macros?: MacroNutrientsProps;
   instructions?: InstructionProps[];
};

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

export const recipeSchema = new Schema<RecipeProps>({
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
