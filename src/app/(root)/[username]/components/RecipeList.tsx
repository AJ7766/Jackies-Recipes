"use client"
import { SearchRecipe } from "./SearchRecipeComponent";
import { useEffect, useState } from "react";
import { useSelectedRecipe } from "@/_context/SelectedRecipeContext";
import { RecipeProps } from "@/_types/RecipeTypes";
import Image from "next/image";
import Link from "next/link";
import { UserProps } from "@/_types/UserTypes";

export default function RecipeList({ profile }: { profile: UserProps }) {
  const [searchRecipe, setSearchRecipe] = useState('')
  const [recipes, setRecipes] = useState<RecipeProps[]>(profile.recipes || []);
  const [recipe, setRecipe] = useState<RecipeProps | null>(null);

  useEffect(() => searchRecipe && profile.recipes ? setRecipes(
    profile.recipes.filter((recipe) =>
      recipe.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          searchRecipe
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''))
    )
  ) : setRecipes(profile.recipes || [])
    , [searchRecipe])

  if (!profile.recipes || profile.recipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  const handleSearchChange = (query: string) => {
    setSearchRecipe(query);
  }

  return <>
    <SearchRecipe searchRecipe={searchRecipe} handleSearchChange={handleSearchChange} />
    <div className="recipe-wrapper">
      {recipes.some(recipe => recipe.title) ? (
        recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <Image
              src={recipe.image || ""}
              onClick={() => setRecipe(({
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
              width={1280}
              height={1280}
              className="recipe-img"
              fetchPriority="high"
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 500px"
            />
            <div className='recipe-info-container'>
              <h1 className='recipe-title cursor-pointer'
                onClick={() => setRecipe(({
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
                <Image
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
              <Link href={`/edit-recipe/${recipe._id}`} prefetch={false}>
                <Image
                  src={'/images/icons/cogwheel.svg'}
                  width={16}
                  height={16}
                  className="edit-img"
                  alt="edit"
                />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="noRecipesContainer col-span-3">
          <h1>No recipes were found</h1>
        </div>
      )}
    </div>
  </>

}
