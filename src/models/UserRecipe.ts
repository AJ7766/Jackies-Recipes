import mongoose, { Model, Schema } from "mongoose";

export interface RecipeProps extends Document {
   _id: mongoose.Types.ObjectId;
   title: string;
   image?: string;
   ingredients: IngredientListProps[];
   servings?: number;
   macros?: MacroNutrientsProps;
   instructions?: InstructionProps[];
}

export type SimplifiedRecipeProps = {
   _id: mongoose.Types.ObjectId;
   title: string;
   image?: string;
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
   component?: ComponentProps[];
   ingredients: IngredientProps[];
}

export type ComponentProps = {
   id: string;
   component: string;
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

const ComponentSchema = new Schema<ComponentProps>({
   id: { type: String, required: true },
   component: { type: String }
});

const IngredientSchema = new Schema<IngredientProps>({
   id: { type: String, required: true },
   ingredient: { type: String, required: true },
   amount: { type: Number },
   unit: { type: String }
});

const IngredientListSchema = new Schema<IngredientListProps>({
   component: [ComponentSchema],
   ingredients: [IngredientSchema]
});

const MacroNutrientsSchema = new Schema<MacroNutrientsProps>({
   carbs: { type: Number },
   protein: { type: Number },
   fat: { type: Number },
   calories: { type: Number }
});

const InstructionSchema = new Schema<InstructionProps>({
   id: { type: String, required: true },
   instruction: { type: String }
});

export const recipeSchema = new Schema<RecipeProps>({
   title: { type: String, required: true },
   image: { type: String },
   ingredients: [IngredientListSchema],
   servings: { type: Number },
   macros: MacroNutrientsSchema,
   instructions: [InstructionSchema]
});

export const RecipeModel: Model<RecipeProps> = mongoose.models.recipes || mongoose.model<RecipeProps>('recipes', recipeSchema);
