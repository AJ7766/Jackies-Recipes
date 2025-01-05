import AddRecipe from "./containers/AddRecipe";

export default async function AddRecipePage() {
  return <AddRecipe />
}

export async function generateMetadata() {
  return {
    title: `Add a Recipe - Jackies Recipes`,
    description: `Share your delicious recipes with the Jackies Recipes community. Create and upload your favorite recipes to inspire others.`,
  };
}