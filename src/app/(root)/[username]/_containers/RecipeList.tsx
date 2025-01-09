"use client"
import { RecipesListComponent } from "../_components/RecipesListComponent";
import { useProfile } from "@/app/_context/ProfileContext";
import { SearchRecipe } from "../_components/SearchRecipeComponent";
import { useEffect, useState } from "react";
import { useSelectedRecipe } from "@/app/_context/SelectedRecipeContext";
import { RecipeProps } from "@/_types/RecipeTypes";
import SelectedRecipe from "@/components/SelectedRecipe/SelectedRecipe";

export default function RecipeList() {
  const { profile } = useProfile();
  const { selectedRecipeHandler } = useSelectedRecipe();
  const [searchRecipe, setSearchRecipe] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeProps[]>(profile.recipes || []);

  useEffect(() => searchRecipe && profile.recipes ? setFilteredRecipes(
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
  ) : setFilteredRecipes(profile.recipes || [])
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
    {profile.recipes && <SelectedRecipe />}
    <SearchRecipe searchRecipe={searchRecipe} handleSearchChange={handleSearchChange} />
    <RecipesListComponent
      profile={profile}
      recipes={filteredRecipes}
      selectedRecipeHandler={selectedRecipeHandler}
    />
  </>

}
