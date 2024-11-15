"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AuthGuardEditUser } from "./services/editProfile";
import EditProfile from "./containers/EditProfile";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <AuthGuardEditUser>
      <EditProfile user={user || null} />
    </AuthGuardEditUser>
  );
}
