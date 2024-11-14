import Image from "next/image";

import React, { useEffect } from "react";
import Link from "next/link";
import { Types } from "mongoose";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function MasonaryComponent({
  columns = null,
}: {
  columns: RecipeCardProps[][] | null;
}) {
  return (
    <>
      <h1 className="text-xl text-center mb-5">Latest Recipes</h1>
      <div className="gap-10 flex flex-wrap justify-center">
        {columns && columns.length > 0 && (
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
                          alt={recipe.title}
                          loading="lazy"
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
        )}
      </div>
    </>
  );
}
