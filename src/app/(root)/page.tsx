import { getRecipesController } from "../../server/actions/recipes/recipesController";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import SelectedRecipe from "../../components/SelectedRecipe/SelectedRecipe";

export default async function Home() {
  const serverRecipes = await getRecipesController();

  return (
    <>
      <SelectedRecipe />
      <h1 className="text-xl text-center mb-5 mt-5 font-metropolis">Latest Recipes</h1>
      <RecipeList recipes={typeof serverRecipes === 'string' ? JSON.parse(serverRecipes) : serverRecipes} profile={serverRecipes.user} />
    </>
  )
}

export async function generateMetadata() {
  return {
    title: 'Jackies Recipes',
    description: "Welcome to Jackies Recipes, a social platform for sharing recipes."
  };
}
