import EditRecipe from "./containers/editRecipe";
import { fetchGetRecipeAPI } from "./services/fetchGetRecipeAPI";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { fetchedRecipe, userHasRecipe } = await fetchGetRecipeAPI(id);

  return (
    <EditRecipe serverRecipe={fetchedRecipe} userHasRecipe={userHasRecipe} recipe_id={id}/>
  )
}

export async function generateMetadata() {
  return {
    title: `Edit your Recipe - Jackies Recipes`,
    description: `Edit your recipe on Jackies Recipes to share it with others and make changes to your original post.`,
  };
}