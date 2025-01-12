import { getSession } from "@/_utils/session";
import { getProfileController, getProfileMetaController } from "./_ssr/profileController";
import { Profile } from "./components/Profile/Profile";
import ProfileRecipeList from "./components/ProfileRecipeList";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const session = await getSession();
  const { username } = await params;
  const { serverProfile, isFollowing } = await getProfileController(username.toLocaleLowerCase(), session.user_id);
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
      <ProfileRecipeList profile={serverProfile} ownProfile={ownProfile}/>
    </>
  )
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