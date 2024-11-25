import { AuthGuard } from "../_services/authGuard";
import AddRecipe from "./containers/AddRecipe";

export const dynamic = 'force-static';

export default function AddRecipePage() {

  return (
    <AuthGuard>
      <AddRecipe />
    </AuthGuard>
  );
}
