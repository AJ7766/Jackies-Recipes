import { getSession } from "@/_utils/session";
import Dashboard from "./_containers/Dashboard";
import { getRecipesController } from "./_ssr/recipes/recipesController";
import LoginPage from "./_containers/LoginPage";

export default async function DashboardPage() {
  const session = await getSession();
  const serverRecipes = await getRecipesController();

  if (!session.isAuth)
    return <LoginPage />

  return <Dashboard serverRecipes={serverRecipes} />
}
