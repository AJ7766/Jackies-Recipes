import { AuthGuard } from "../_services/authGuard";
import AddRecipe from "./containers/AddRecipe";

export default async function AddRecipePage() {

  return (
    <AuthGuard>
      <AddRecipe />
    </AuthGuard>
  );
}

export async function generateMetadata() {
  return {
    title: `Add a Recipe - Jackies Recipes`,
    description: `Share your delicious recipes with the Jackies Recipes community. Create and upload your favorite recipes to inspire others.`,
  };
}