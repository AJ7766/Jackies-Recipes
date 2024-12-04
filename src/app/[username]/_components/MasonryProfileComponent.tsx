import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { RecipePopulatedProps } from "@/_models/RecipeModel";

export const MasonaryProfileComponent = React.memo(({
  username,
  recipes,
  canEdit
}: {
  username: string;
  recipes: RecipePopulatedProps[];
  canEdit: boolean;
}) => {
  return (
    <>
        <div className="masonryContainer">
          {Array.from({ length: 3 }).map((_, columnIndex) => (
            <div className="masonryColumn" key={columnIndex}>
              {recipes.filter((_, recipeIndex) => recipeIndex % 3 === columnIndex)
                .map((recipe, recipeIndex) => (
                  <React.Fragment key={recipeIndex}>
                    <Link href={`/${username}/${recipe._id}`} scroll={false} prefetch>
                      <div className="masonryImg">
                        <CldImage
                          src={recipe.image || ""}
                          alt={recipe.title}
                          width={200}
                          height={200}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    <div className="recipeSettingsContainer">
                      <Link href={`/${username}/${recipe._id}`} scroll={false} prefetch>
                        <h1>{recipe.title}</h1>
                      </Link>
                      {canEdit && (
                        <Link href={`/edit-recipe/${recipe._id}`} prefetch>
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
    </>
  );
});
