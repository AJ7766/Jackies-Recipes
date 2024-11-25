import { AuthGuard } from "../_services/authGuard";
import EditProfile from "./containers/EditProfile";

export default async function SettingsPage() {
  return (
    <AuthGuard>
      <EditProfile />
    </AuthGuard>
  );
}
