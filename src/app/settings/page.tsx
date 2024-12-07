import { AuthGuard } from "../_services/authGuard";
import EditProfile from "./containers/EditProfile";

export default async function SettingsPage() {
  return (
    <AuthGuard>
      <EditProfile />
    </AuthGuard>
  );
}

export async function generateMetadata() {
  return {
    title: `Edit Profile - Jackies Recipes`,
    description: `Update your personal details and preferences on Jackies Recipes to keep your profile up-to-date and fully personalized.`,
  };
}