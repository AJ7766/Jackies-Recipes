import { getSession } from "@/_utils/session";
import dynamic from "next/dynamic";
import { getRecipesController } from "../_ssr/recipes/recipesController";
import { Loader } from "../_components/Loader";
import { redirect } from "next/navigation";
const Dashboard = dynamic(() => import('../_containers/Dashboard'),
  {
    ssr: true,
    loading: () => <Loader />
  });

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.token)
    return redirect('/login');

  const serverRecipes = await getRecipesController();
  return <Dashboard serverRecipes={typeof serverRecipes === 'string' ? JSON.parse(serverRecipes) : serverRecipes} />
}

export async function generateMetadata() {
  const session = await getSession();

  return {
    title: session.token ? 'Jackies Recipes' : 'Login - Jackies Recipes',
    description: session.token
      ? "Welcome to Jackies Recipes, a social platform for sharing recipes."
      : "Login to your account at Jackies Recipes to share your favorite recipes.",
  };
}
