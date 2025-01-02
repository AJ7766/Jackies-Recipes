import { getSession } from "@/_utils/session";
import { getUserController } from "./ssr/userController";
import EditProfile from "./containers/EditProfile";

export default async function SettingsPage() {
  const session = await getSession();
  const serverUser = await getUserController(session.user_id);
  
  return (
    <EditProfile user={typeof serverUser === 'string' ? JSON.parse(serverUser): serverUser} />
  );
}

export async function generateMetadata() {
  return {
    title: `Edit Profile - Jackies Recipes`,
    description: `Update your personal details and preferences on Jackies Recipes to keep your profile up-to-date and fully personalized.`,
  };
}