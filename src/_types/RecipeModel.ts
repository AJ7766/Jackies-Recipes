import { UserProps } from "./UserModel";

export interface RecipeProps {
   _id: string;
   user: UserProps;
   title: string;
   image: string;
   ingredients: IngredientListProps[];
   servings?: number;
   macros?: MacroNutrientsProps;
   instructions?: InstructionProps[];
   savedBy?: string[];
}

export interface RecipeFormProps extends Omit<RecipeProps, "user" | "_id"> { }

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
   ingredient: string;
   amount?: number;
   unit: string;
}

export type InstructionProps = {
   instruction: string;
}