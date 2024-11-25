"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { Types } from "mongoose";
import { useAuth } from "@/app/_context/AuthContext";
import { usePathname } from "next/navigation";
import { MasonaryProfileComponent } from "../_components/MasonaryProfileComponent";
import { createMasonary } from "@/app/_services/masonaryServices";
import { useProfile } from "@/app/_context/ProfileContext";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}
export default function MasonaryProfile() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [totalColumns, setTotalColumns] = useState<number>(4);
  const [columns, setColumns] = useState<RecipeCardProps[][] | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    setTotalColumns(window.innerWidth > 768 ? 4 : 3)
  }, [])

  useEffect(() => {
    if (!user) return;
    const pathParts = pathname.split("/");
    const usernameLink = pathParts[pathParts.length - 1];
    if (usernameLink === user?.username) {
      setCanEdit(true);
    }
  }, [user, pathname]);

  useEffect(() => {
    if (profile && profile.recipes) {
      const fetchRecipes = async () => {
        const masonaryColumns = await createMasonary(profile.recipes, totalColumns)
        setColumns(masonaryColumns);
      }
      fetchRecipes();
    }
  }, [profile.recipes]);

  if (!columns) return null;

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
      columns={columns || null}
      canEdit={canEdit}
    />
  );
}
