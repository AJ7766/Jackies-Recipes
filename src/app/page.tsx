import Dashboard from "./_containers/Dashboard";
import { AuthGuardLogin } from "./_services/authGuard";
import { getRecipesController } from "./_ssr/recipes/recipesController";

export default async function DashboardPage() {
  const serverRecipes = await getRecipesController();
  return (
    <AuthGuardLogin>
      <Dashboard serverRecipes={serverRecipes}/>
    </AuthGuardLogin>
  );
}
