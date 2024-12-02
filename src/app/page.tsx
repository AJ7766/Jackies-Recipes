import { getSession } from "@/_utils/session";
import Dashboard from "./_containers/Dashboard";
import LoginPage from "./_containers/LoginPage";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isAuth)
    return <LoginPage />

  return <Dashboard />
}