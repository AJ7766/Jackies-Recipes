import { getSession } from "@/_utils/session";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import('./_containers/Dashboard'), { ssr: true });
const LoginPage = dynamic(() => import('./_containers/LoginPage'), { ssr: true });

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isAuth)
    return <LoginPage />

  return <Dashboard />
}

export async function generateMetadata() {
  const session = await getSession();

  return {
    title: session.isAuth ? 'Jackies Recipes' : 'Login - Jackies Recipes',
    description: session.isAuth
      ? "Welcome to Jackies Recipes, a social platform for sharing recipes."
      : "Login to your account at Jackies Recipes to share your favorite recipes.",
  };
}