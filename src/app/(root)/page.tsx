import { getRecipesController } from "../../server/actions/recipes/recipesController";
import { RecipeList } from "../components/RecipeList";
import SelectedRecipe from "../../components/SelectedRecipe/SelectedRecipe";

export default async function Home() {
  const serverRecipes = await getRecipesController();

  if (serverRecipes && serverRecipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return (
    <>
      <SelectedRecipe />
      <RecipeList recipes={typeof serverRecipes === 'string' ? JSON.parse(serverRecipes) : serverRecipes} />
    </>
  )
}

export async function generateMetadata() {
  return {
    title: 'Jackies Recipes',
    description: "Welcome to Jackies Recipes, a social platform for sharing recipes."
  };
}
