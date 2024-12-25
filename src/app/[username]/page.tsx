import { getSession } from "@/_utils/session";
import Profile from "./_containers/Profile";
import RecipeList from "./_containers/RecipeList";
import { getIsFollowingController, getProfileMetaController } from "./_ssr/profileController";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  const { username } = await params;
  const serverIsFollowing = session.user_id && await getIsFollowingController(username, session.user_id) || false;
  return <>
    <Profile user_id={session.user_id} serverIsFollowing={serverIsFollowing} />
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