"use client"
import { useAuth } from "@/app/_context/AuthContext";
import { usePathname } from "next/navigation";
import { MasonaryProfileComponent } from "../_components/MasonryProfileComponent";
import { useProfile } from "@/app/_context/ProfileContext";

export default function MasonryProfile() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const pathname = usePathname();
  
  const pathParts = pathname.split("/");
  const usernameLink = pathParts[pathParts.length - 1];
  const canEdit = user?.username === usernameLink;

  if (profile?.recipes.length === 0 || !profile?.recipes) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return (
    <MasonaryProfileComponent
      username={profile.username}
      recipes={profile.recipes}
      canEdit={canEdit}
    />
  );
}
