import Image from "next/image";

import React, { useCallback, useEffect, useState } from "react";
import { ProfilePropsOrNull } from "../types/types";
import Link from "next/link";
import { Types } from "mongoose";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Masonary({ profile }: { profile: ProfilePropsOrNull }) {
  interface RecipeCardProps {
    id: Types.ObjectId | undefined;
    title: string;
    image: string | string;
  }

  const [totalColumns, setTotalColumns] = useState<number>(1);
  const [canEdit, setCanEdit] = useState(false);
  const [columns, setColumns] = useState<RecipeCardProps[][]>(() =>
    Array.from({ length: 1 }, () => [])
  );

  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const fetchAuthenticated = async () => {
      const pathParts = pathname.split("/");
      const usernameLink = pathParts[pathParts.length - 1];
      if (usernameLink === user?.username) {
        setCanEdit(true);
      }
    };
    if (user) {
      fetchAuthenticated();
    }
  });

  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    setTotalColumns(width > 768 ? 3 : 2);
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (profile?.recipes) {
        const newColumns: RecipeCardProps[][] = Array.from(
          { length: totalColumns },
          () => []
        );
        profile.recipes.forEach((recipe, index) => {
          const recipeCard = {
            id: recipe._id,
            title: recipe.title,
            image: recipe.image || "",
          };
          const columnIndex = index % totalColumns;
          newColumns[columnIndex].push(recipeCard);
          setColumns(newColumns);
        });
      }
    };
    fetchRecipes();
  }, [totalColumns, profile?.recipes]);
  return (
    <>
      {columns.length > 1 ? (
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
                        alt={`Image${recipeIndex}`}
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
