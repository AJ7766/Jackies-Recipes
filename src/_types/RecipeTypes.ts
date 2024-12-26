import { UserProps } from "./UserTypes";

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

export interface MacroNutrientsProps {
   carbs?: number,
   protein?: number,
   fat?: number,
   calories?: number
}

export interface IngredientListProps {
   component?: string;
   ingredients: IngredientProps[];
}

export interface IngredientProps {
   ingredient: string;
   amount?: number;
   unit: string;
}

export interface InstructionProps {
   instruction: string;
}