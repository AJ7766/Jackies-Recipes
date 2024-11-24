import { AuthGuard } from "@/app/_services/authGuard";
import EditRecipe from "../containers/editRecipe";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <AuthGuard>
      <EditRecipe recipe_id={id} />
    </AuthGuard>
    )
}
