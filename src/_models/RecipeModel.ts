import mongoose, { Model, Schema, Document } from "mongoose";
import { UserModel } from "./UserModel";
import { IngredientListProps, IngredientProps, InstructionProps, MacroNutrientsProps, RecipeProps } from "@/_types/RecipeTypes";

const IngredientSchema = new Schema<IngredientProps>({
   ingredient: { type: String, required: true },
   amount: { type: Number },
   unit: { type: String }
});

const IngredientListSchema = new Schema<IngredientListProps>({
   component: { type: String },
   ingredients: [IngredientSchema]
});

const MacroNutrientsSchema = new Schema<MacroNutrientsProps>({
   carbs: { type: Number },
   protein: { type: Number },
   fat: { type: Number },
   calories: { type: Number }
});

const InstructionSchema = new Schema<InstructionProps>({
   instruction: { type: String }
});

interface RecipeDocument extends RecipeProps, Document {
   _id: string;
}

const recipeSchema = new Schema<RecipeDocument>({
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
   instructions: [InstructionSchema],
   savedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
   }],
}, { timestamps: true });

recipeSchema.pre('findOneAndDelete', async function (next) {
   try {
      const recipeId = this.getFilter()._id;
      const result = await UserModel.updateOne(
         { recipes: recipeId },
         { $pull: { recipes: recipeId } }
      );
      console.log(`Recipe removed from ${result.modifiedCount} user(s).`);
      next();
   } catch (error: any) {
      next(error);
   }
});

recipeSchema.index({ createdAt: 1 });

export const RecipeModel: Model<RecipeProps> = mongoose.models.recipes || mongoose.model<RecipeProps>('recipes', recipeSchema);
