"use client"
import { useAuth } from "@/app/_context/AuthContext";
import { usePathname } from "next/navigation";
import { RecipesListComponent } from "../_components/RecipesListComponent";
import { useProfile } from "@/app/_context/ProfileContext";

export default function RecipeList() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const pathname = usePathname();

  const pathParts = pathname.split("/");
  const usernameLink = pathParts[1];
  const canEdit = user?.username === usernameLink;

  if (profile?.recipes.length === 0 || !profile?.recipes) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return (
    <RecipesListComponent
      recipes={profile.recipes}
      profilePicture={profile.userContent?.profilePicture}
      username={profile.username}
      canEdit={canEdit}
    />
  );
}
