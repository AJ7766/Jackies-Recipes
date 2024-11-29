import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { Types } from "mongoose";

interface RecipeCardProps {
    id: Types.ObjectId | undefined;
    title: string;
    image: string | string;
    user: { username: string };
  }

export const createMasonary = async (recipes: RecipePopulatedProps[], totalColumns: number) => {
    const masonaryColumns: RecipeCardProps[][] = Array.from(
      { length: totalColumns },
      () => []
    );
    recipes.reduce((currentColumns, recipe, index) => {
      const recipeCard: RecipeCardProps = {
        id: recipe._id,
        title: recipe.title,
        image: recipe.image || "",
        user: {
          username: recipe.user.username || "",
        },
      };
      currentColumns[index % totalColumns].push(recipeCard);
      return currentColumns;
    }, masonaryColumns);

    return masonaryColumns;
  };