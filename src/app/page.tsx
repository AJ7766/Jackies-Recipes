import { getSession } from "@/_utils/session";
import Dashboard from "./_containers/Dashboard";
import LoginPage from "./_containers/LoginPage";
import { getRecipesController } from "./_ssr/recipes/recipesController";
import redisClient from "@/_utils/redis";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isAuth)
    return <LoginPage />

  const cached_recipes = await redisClient.get('recipes');
  if (cached_recipes) {
    console.log("redis cached recipes")
    return <Dashboard serverRecipes={JSON.parse(cached_recipes)} />
  }

  const serverRecipes = await getRecipesController();
  return <Dashboard serverRecipes={JSON.parse(serverRecipes)} />
}