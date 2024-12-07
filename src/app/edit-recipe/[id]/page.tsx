import { AuthGuard } from "@/app/_services/authGuard";
import EditRecipe from "../containers/editRecipe";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AuthGuard>
      <EditRecipe recipe_id={id} />
    </AuthGuard>
  )
}

export async function generateMetadata() {
  return {
    title: `Edit your Recipe - Jackies Recipes`,
    description: `Edit your recipe on Jackies Recipes to share it with others and make changes to your original post.`,
  };
}