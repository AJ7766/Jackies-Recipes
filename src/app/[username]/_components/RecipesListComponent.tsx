import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useSelectedRecipe } from "@/app/_context/SelectedRecipeContext";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import mongoose from "mongoose";
const cogwheel = "/images/icons/cogwheel.svg";

export const RecipesListComponent = React.memo(({
  profile,
  canEdit
}: {
  profile: UserPopulatedRecipePopulatedProps;
  canEdit: boolean;
}) => {
  const { selectedRecipeHandler } = useSelectedRecipe();
  return (
    <div className="recipe-wrapper">
      {profile.recipes.map((recipe, recipeIndex) => (
        <div className="recipe-container" key={recipeIndex}>
          <CldImage
            src={recipe.image || ""}
            onClick={() => selectedRecipeHandler(({
              _id: recipe._id,
              user: {
                _id: new mongoose.Types.ObjectId,
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
                  _id: new mongoose.Types.ObjectId,
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
