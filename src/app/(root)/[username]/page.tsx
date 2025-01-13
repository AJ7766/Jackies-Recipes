import { getSession } from "@/_utils/session";
import { Profile } from "../../../components/Profile/Profile";
import ProfileRecipeList from "../../../components/RecipeList/ProfileRecipeList";
import dynamic from "next/dynamic";
import { handleGetProfile, handleGetProfileMeta } from "@/server/actions/profile/profileHandler";
const SelectedRecipe = dynamic(() => import('@/components/SelectedRecipe/SelectedRecipe'), { ssr: true });

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  const { username } = await params;
  const { serverProfile, isFollowing } = await handleGetProfile(username.toLocaleLowerCase(), session.user_id);
  const ownProfile = username === session.username;
  
  if (!serverProfile)
    return (
      <div className="errorContainer">
        <h1>
          User not found.
        </h1>
      </div>
    )

  return (
    <>
      <Profile serverProfile={serverProfile} ownProfile={ownProfile} user_id={session.user_id} serverIsFollowing={isFollowing || false} />
      <div className="divider"></div>
      <SelectedRecipe />
      <ProfileRecipeList profile={serverProfile} ownProfile={ownProfile}/>
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { serverProfile, message } = await handleGetProfileMeta(username.toLocaleLowerCase());

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