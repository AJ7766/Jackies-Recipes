import Profile from "./_containers/Profile";
import RecipeList from "./_containers/RecipeList";
import { getProfileMetaController } from "./_ssr/profileController";

export default async function ProfilePage() {
  return <>
    <Profile />
    <RecipeList />
  </>;
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { serverProfile, message } = await getProfileMetaController(username.toLocaleLowerCase());
  
  if (!serverProfile) {
    console.error(message)
    return {
      title: `User not found • Profile and Recipes on Jackies Recipes`,
      description: `User not found • Browse users recipes and explore their shared culinary creations.`,
    }
  }

  return {
    title: `${serverProfile.fullName} (@${username}) • Profile and Recipes on Jackies Recipes`,
    description: `${username}'s profile on Jackies Recipes. Browse their recipes and explore their shared culinary creations.`,
  };
}