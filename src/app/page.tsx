"use client";
import Dashboard from "./_containers/Dashboard";
import { AuthGuard } from "./_services/dashboard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
