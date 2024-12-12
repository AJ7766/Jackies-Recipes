import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
const cogwheel = "/images/icons/cogwheel.svg";

export const RecipesListComponent = React.memo(({
  recipes,
  profilePicture,
  username,
  canEdit
}: {
  recipes: RecipePopulatedProps[];
  profilePicture: string | undefined;
  username: string;
  canEdit: boolean;
}) => {
  return (
      <div className="recipe-wrapper">
        {recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <Link href={`/${username}/${recipe._id}`} scroll={false} prefetch>
              <CldImage
                src={recipe.image || ""}
                alt={recipe.title}
                width={1280}
                height={1280}
                className="recipe-img"
                fetchPriority="high"
                loading="lazy"
                sizes="(max-width: 768px) 33vw, 500px"
              />
            </Link>
            <div className='recipe-info-container'>
              <Link href={`/${username}/${recipe._id}`} scroll={false}  prefetch>
                <h1 className='recipe-title'>{recipe.title}</h1>
                <p className="text-center text-gray-500">@{username}</p>
              </Link>
              <div className='recipe-profile-picture-container'>
                <CldImage
                  width={50}
                  height={50}
                  src={profilePicture || ''}
                  alt={`${username} profile picture`}
                  className="recipe-profile-picture"
                  fetchPriority="high"
                  loading="lazy"
                />
                <div className='recipe-profile-image-pseudo'></div>
              </div>
              {canEdit && (
                <Link href={`/edit-recipe/${recipe._id}`} prefetch>
                  <Image
                    src={cogwheel}
                    width={16}
                    height={16}
                    className="edit-img"
                    alt="edit"
                  />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
  )
})
