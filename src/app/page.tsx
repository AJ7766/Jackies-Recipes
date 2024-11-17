"use client";
import Dashboard from "./_containers/Dashboard";
import { AuthGuardLogin } from "./_services/authGuard";

export default function DashboardPage() {
  return (
    <AuthGuardLogin>
      <Dashboard />
    </AuthGuardLogin>
  );
}
