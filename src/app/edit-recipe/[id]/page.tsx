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
