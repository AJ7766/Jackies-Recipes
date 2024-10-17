import Image from "next/image";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Types } from "mongoose";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ProfileProps } from "@/app/types/types";

export default function Masonary({
  profile = null,
}: {
  profile: ProfileProps | null;
}) {
  interface RecipeCardProps {
    id: Types.ObjectId | undefined;
    title: string;
    image: string | string;
  }

  const [totalColumns, setTotalColumns] = useState<number>(1);
  const [canEdit, setCanEdit] = useState(false);
  const [columns, setColumns] = useState<RecipeCardProps[][]>([]);

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

  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    setTotalColumns(width > 768 ? 4 : 3);
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  useEffect(() => {
    if (!profile?.recipes) return;

    const newColumns: RecipeCardProps[][] = Array.from(
      { length: totalColumns },
      () => []
    );

    profile.recipes.reduce((currentColumns, recipe, index) => {
      const recipeCard: RecipeCardProps = {
        id: recipe._id,
        title: recipe.title,
        image: recipe.image || "",
      };
      currentColumns[index % totalColumns].push(recipeCard);
      return currentColumns;
    }, newColumns);

    setColumns(newColumns);
  }, [totalColumns, profile?.recipes]);

  return (
    <>
      {profile?.recipes && profile.recipes.length > 0 ? (
        <div className="masonryContainer">
          {columns.map((column, columnIndex) => (
            <div className="masonryColumn" key={columnIndex}>
              {column.map((recipe, recipeIndex) => (
                <React.Fragment key={recipeIndex}>
                  <Link
                    href={`/${profile?.username}/${recipe.id}`}
                    scroll={false}
                  >
                    <div className="masonryImg">
                      <Image
                        width={500}
                        height={500}
                        src={recipe.image || ""}
                        alt={recipe.title}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="recipeSettingsContainer">
                    <Link
                      href={`/${profile?.username}/${recipe.id}`}
                      scroll={false}
                    >
                      <h1>{recipe.title}</h1>
                    </Link>
                    {canEdit && (
                      <Link href={`/edit-recipe/${recipe.id}`}>
                        <Image
                          src="/images/cogwheel.svg"
                          width={24}
                          height={24}
                          alt="edit"
                        />
                      </Link>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="noRecipesContainer">
          <h1>No recipes were found</h1>
        </div>
      )}
    </>
  );
}
