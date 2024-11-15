import { useEffect, useState } from "react";
import { Types } from "mongoose";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { useAuth } from "@/app/_context/AuthContext";
import { usePathname } from "next/navigation";
import MasonaryProfileComponent from "../_components/MasonaryProfileComponent";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function MasonaryProfile({
  profile,
}: {
  profile: UserPopulatedRecipePopulatedProps | null;
}) {
  const [totalColumns, setTotalColumns] = useState<number>(
    window.innerWidth > 768 ? 5 : 3
  );
  const [columns, setColumns] = useState<RecipeCardProps[][] | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

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
      const newColumns: RecipeCardProps[][] = Array.from(
        { length: totalColumns },
        () => []
      );

      profile.recipes.reduce((currentColumns, recipe, index) => {
        const recipeCard: RecipeCardProps = {
          id: recipe._id,
          title: recipe.title,
          image: recipe.image || "",
          user: {
            username: recipe.user.username || "",
          },
        };
        currentColumns[index % totalColumns].push(recipeCard);
        return currentColumns;
      }, newColumns);

      setColumns(newColumns);
    }
  }, []);

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
      profile={profile || null}
      columns={columns || null}
      canEdit={canEdit}
    />
  );
}
