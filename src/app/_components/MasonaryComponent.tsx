import { CldImage } from 'next-cloudinary';
import React from "react";
import Link from "next/link";
import { Types } from "mongoose";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export const MasonaryComponent = React.memo(({ columns }: { columns: RecipeCardProps[][] }) => {
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
                        <CldImage
                          width={200}
                          height={200}
                          src={recipe.image || ""}
                          alt={recipe.title}
                          className="w-full h-auto"
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
});