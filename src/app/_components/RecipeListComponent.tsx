import { CldImage } from 'next-cloudinary';
import React from "react";
import Link from "next/link";
import { RecipePopulatedProps } from '@/_models/RecipeModel';
const profilePicture = '/images/profilePicture.png';

export const RecipeListComponent = React.memo(({ recipes }: { recipes: RecipePopulatedProps[] }) => {
  return (
    <>
      <h1 className="text-xl text-center mb-5 mt-5 font-metropolis">Latest Recipes</h1>
      <div className="recipe-wrapper">
        {recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <Link
              href={`/${recipe.user.username}/${recipe._id}`}
              scroll={false}
            >
              <CldImage
                width={1280}
                height={1280}
                src={recipe.image || ""}
                alt={recipe.title}
                fetchPriority='high'
                crop='limit'
                className="recipe-img"
                loading="lazy"
                sizes="(max-width: 768px) 33vw, 500px"
                format="webp"
              />
            </Link>
            <div className='recipe-info-container'>
              <Link
                href={`/${recipe.user.username}/${recipe._id}`}
                scroll={false}
              >
                <h1 className='recipe-title'>{recipe.title}</h1>
                <p className="text-center text-gray-500">@{recipe.user.username}</p>
              </Link>
              <div className='recipe-profile-picture-container'>
                <CldImage
                  width={50}
                  height={50}
                  src={recipe.user.userContent?.profilePicture || profilePicture}
                  alt={`${recipe.user.username} profile picture`}
                  className="recipe-profile-picture"
                  loading="lazy"
                />
                <div className='recipe-profile-image-pseudo'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
})