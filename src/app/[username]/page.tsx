"use server"
import { getProfileController } from "./_ssr/profileController";

export default async function PlaceholderPage() {
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { serverProfile } = await getProfileController(username.toLocaleLowerCase());

  if(!serverProfile)
    return{
      title: `User not found • Profile and Recipes on Jackies Recipes`,
      description: `User not found • Browse users recipes and explore their shared culinary creations.`,
    }
    
  return {
    title: `${serverProfile.fullName} (@${username}) • Profile and Recipes on Jackies Recipes`,
    description: `${username}'s profile on Jackies Recipes. Browse their recipes and explore their shared culinary creations.`,
  };
}