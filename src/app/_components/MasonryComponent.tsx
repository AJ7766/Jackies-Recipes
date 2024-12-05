import { CldImage } from 'next-cloudinary';
import React from "react";
import Link from "next/link";
import { RecipePopulatedProps } from '@/_models/RecipeModel';

export const MasonryComponent = React.memo(({ recipes }: { recipes: RecipePopulatedProps[] }) => {
  if(!recipes) return null;
  return (
    <>
      <h1 className="text-xl text-center mb-5">Latest Recipes</h1>
          <div className="masonryContainerMainPage">
            {Array.from({ length: 3 }).map((_, columnIndex) => (
              <div className="masonryColumn" key={columnIndex}>
                {recipes.filter((_, recipeIndex) => recipeIndex % 3 === columnIndex)
                  .map((recipe, recipeIndex) => (
                  <React.Fragment key={recipeIndex}>
                    <Link
                      href={`/${recipe.user.username}/${recipe._id}`}
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
                        href={`/${recipe.user.username}/${recipe._id}`}
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
    </>
  );
});