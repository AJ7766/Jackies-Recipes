import { CldImage } from 'next-cloudinary';
import React from "react";
import { RecipePopulatedProps } from '@/_models/RecipeModel';
import { useSelectedRecipe } from '../_context/SelectedRecipeContext';
import Link from 'next/link';
const profilePicture = '/images/profilePicture.png';

export const RecipeListComponent = React.memo(({ recipes }: { recipes: RecipePopulatedProps[] }) => {
  const { setRecipe, changeURL } = useSelectedRecipe();
  return (
    <>
      <h1 className="text-xl text-center mb-5 mt-5 font-metropolis">Latest Recipes</h1>
      <div className="recipe-wrapper">
        {recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <CldImage
              width={1280}
              height={1280}
              src={recipe.image || ""}
              onClick={() => {
                changeURL(recipe);
                setRecipe(recipe);
              }}
              alt={recipe.title}
              fetchPriority='high'
              className="recipe-img"
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 500px"
            />
            <div className='recipe-info-container'>
              <h1 className='recipe-title cursor-pointer' onClick={() => {
                changeURL(recipe);
                setRecipe(recipe);
              }}>{recipe.title}</h1>
              <Link href={`${recipe.user.username}`}> <p className="text-center text-gray-500">@{recipe.user.username}</p></Link>
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