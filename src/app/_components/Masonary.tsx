import Image from "next/image";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Types } from "mongoose";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";

export default function Masonary({
  recipes = [],
}: {
  recipes?: SimplifiedRecipeProps[];
}) {
  interface RecipeCardProps {
    id: Types.ObjectId | undefined;
    title: string;
    image: string | string;
    user: { username: string };
  }

  const [totalColumns, setTotalColumns] = useState<number>(1);
  const [columns, setColumns] = useState<RecipeCardProps[][]>([]);

  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    setTotalColumns(width > 768 ? 5 : 3);
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  useEffect(() => {
    const newColumns: RecipeCardProps[][] = Array.from(
      { length: totalColumns },
      () => []
    );

    recipes.reduce((currentColumns, recipe, index) => {
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
  }, [totalColumns, recipes]);

  return (
    <>
      {recipes.length > 0 ? (
        <div className="masonryContainerMainPage">
          {columns.map((column, columnIndex) => (
            <div className="masonryColumn" key={columnIndex}>
              {column.map((recipe, recipeIndex) => (
                <React.Fragment key={recipeIndex}>
                  <Link
                    href={`/${recipe.user.username}/${recipe.id}`}
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
                      href={`/${recipe.user.username}/${recipe.id}`}
                      scroll={false}
                    >
                      <h1>{recipe.title}</h1>
                    </Link>
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
