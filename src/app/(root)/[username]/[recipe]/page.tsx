import SelectedRecipe from "./containers/SelectedRecipe";
import { getRecipeMetaController } from "./ssr/recipeController";

export default async function RecipePage({ params }: { params: Promise<{ recipe: string }> }) {
  const { recipe } = await params;

  return <SelectedRecipe recipe_id={recipe} />
}

export async function generateMetadata({ params }: { params: Promise<{ recipe: string }> }) {
  const { recipe } = await params;
  const { fetchedRecipe, message } = await getRecipeMetaController(recipe);
  
  if (!fetchedRecipe) {
    console.error(message)
    return;
  }

  return {
    title: `${fetchedRecipe.title} (@${fetchedRecipe.user.username}) • Profile and Recipes on Jackies Recipes`,
    description: `Discover how to make ${fetchedRecipe.title}, a recipe shared by ${fetchedRecipe.user.username} on Jackie's Recipes. Learn step-by-step instructions, explore ingredients, and try this delicious dish today!`,
  };
}