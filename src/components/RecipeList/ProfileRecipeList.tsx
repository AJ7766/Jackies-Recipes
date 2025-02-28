"use client"
import { useEffect, useState } from "react";
import { RecipeProps } from "@/_types/RecipeTypes";
import { UserProps } from "@/_types/UserTypes";
import { RecipeList } from "@/components/RecipeList/ui/RecipeList";
import { SearchRecipe } from "./ui/SearchRecipe";

export default function ProfileRecipeList({ profile, ownProfile }: { profile: UserProps, ownProfile: boolean }) {
  const [searchRecipe, setSearchRecipe] = useState('')
  const [recipes, setRecipes] = useState<RecipeProps[]>(profile.recipes || []);

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

  const handleSearchChange = (query: string) => {
    setSearchRecipe(query);
  }

  return (
    <>
      <SearchRecipe searchRecipe={searchRecipe} handleSearchChange={handleSearchChange} />
      <RecipeList recipes={recipes} profile={profile} ownProfile={ownProfile} />
    </>
  )
}
