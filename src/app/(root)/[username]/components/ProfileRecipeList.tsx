"use client"
import { SearchRecipe } from "./SearchRecipeComponent";
import { useEffect, useState } from "react";
import { useSelectedRecipe } from "@/_context/SelectedRecipeContext";
import { RecipeProps } from "@/_types/RecipeTypes";
import { UserProps } from "@/_types/UserTypes";
import dynamic from "next/dynamic";
import { RecipeList } from "@/components/RecipeList/RecipeList";
const SelectedRecipe = dynamic(() => import('@/components/SelectedRecipe/SelectedRecipe'), { ssr: false });

export default function ProfileRecipeList({ profile, ownProfile }: { profile: UserProps, ownProfile: boolean }) {
  const { recipe } = useSelectedRecipe();
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

  return <>
    {recipe && <SelectedRecipe />}
    <SearchRecipe searchRecipe={searchRecipe} handleSearchChange={handleSearchChange} />
    <RecipeList recipes={recipes} profile={profile} ownProfile={ownProfile} />
  </>

}
