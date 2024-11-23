import { getSession } from "@/_utils/session";
import Dashboard from "./_containers/Dashboard";
import { AuthGuardLogin } from "./_services/authGuard";

export default async function DashboardPage() {
  const session = await getSession();
  console.log(session);
  return (
    <AuthGuardLogin>
      <Dashboard />
    </AuthGuardLogin>
  );
}
