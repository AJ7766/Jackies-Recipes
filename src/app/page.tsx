import { getSession } from "@/_utils/session";
import Dashboard from "./_containers/Dashboard";
import { getRecipesController } from "./_ssr/recipes/recipesController";
import LoginPage from "./_containers/LoginPage";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isAuth)
    return <LoginPage />
    
  const serverRecipes = await getRecipesController();

  return (
    <>
      <Dashboard serverRecipes={serverRecipes} />
    </>
  );
}
