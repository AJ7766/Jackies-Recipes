import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { RecipeProps } from "@/_models/RecipeModel";
import { UserProps } from "@/_models/UserModel";
const cogwheel = "/images/icons/cogwheel.svg";

export const RecipesListComponent = React.memo(({
  profile,
  recipes,
  isAuthenticatedProfile,
  selectedRecipeHandler
}: {
  profile: UserProps;
  recipes: RecipeProps[],
  isAuthenticatedProfile: boolean;
  selectedRecipeHandler: (recipe: RecipeProps) => void;
}) => {
  return (
    <div className="recipe-wrapper">
      {recipes.some(recipe => recipe.title) ? (
        recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <CldImage
              src={recipe.image || ""}
              onClick={() => selectedRecipeHandler(({
                _id: recipe._id,
                user: {
                  _id: "",
                  email: "",
                  fullName: "",
                  username: profile.username,
                  password: "",
                  userContent: {
                    profilePicture: profile.userContent?.profilePicture
                  }
                },
                title: recipe.title,
                image: recipe.image,
                ingredients: recipe.ingredients,
                servings: recipe.servings,
                macros: recipe.macros,
                instructions: recipe.instructions,
              }))}
              alt={recipe.title}
              crop='limit'
              width={1280}
              height={1280}
              className="recipe-img"
              fetchPriority="high"
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 500px"
              format="webp"
            />
            <div className='recipe-info-container'>
              <h1 className='recipe-title cursor-pointer'
                onClick={() => selectedRecipeHandler(({
                  _id: recipe._id,
                  user: {
                    _id: "",
                    email: "",
                    fullName: "",
                    username: profile.username,
                    password: "",
                    userContent: {
                      profilePicture: profile.userContent?.profilePicture
                    }
                  },
                  title: recipe.title,
                  image: recipe.image,
                  ingredients: recipe.ingredients,
                  servings: recipe.servings,
                  macros: recipe.macros,
                  instructions: recipe.instructions,
                }))}>
                {recipe.title}
              </h1>
              <p className="text-center text-gray-500">@{profile.username}</p>
              <div className='recipe-profile-picture-container'>
                <CldImage
                  width={50}
                  height={50}
                  src={profile.userContent?.profilePicture || ''}
                  alt={`${profile.username} profile picture`}
                  className="recipe-profile-picture"
                  fetchPriority="high"
                  loading="lazy"
                />
                <div className='recipe-profile-image-pseudo'></div>
              </div>
              {isAuthenticatedProfile && (
                <Link href={`/edit-recipe/${recipe._id}`} prefetch={false}>
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
        ))
      ) : (
        <div className="noRecipesContainer col-span-3">
          <h1>No recipes were found</h1>
        </div>
      )}
    </div>
  );
});

