import { getSession } from "@/_utils/session";
import dynamic from "next/dynamic";
import { getRecipesController } from "../_ssr/recipes/recipesController";
import { Loader } from "../_components/Loader";
const Dashboard = dynamic(() => import('../_containers/Dashboard'),
  {
    ssr: true,
    loading: () => <Loader />
  });

export default async function DashboardPage() {
  const serverRecipes = await getRecipesController();
  return <Dashboard serverRecipes={typeof serverRecipes === 'string' ? JSON.parse(serverRecipes) : serverRecipes} />
}

export async function generateMetadata() {
  const session = await getSession();

  return {
    title: 'Jackies Recipes',
    description: "Welcome to Jackies Recipes, a social platform for sharing recipes."
  };
}
