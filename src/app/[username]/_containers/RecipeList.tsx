"use client"
import { RecipesListComponent } from "../_components/RecipesListComponent";
import { useProfile } from "@/app/_context/ProfileContext";
import SelectedRecipe from "@/app/_containers/SelectedRecipe";
import { SearchRecipe } from "../_components/SearchRecipeComponent";
import { useEffect, useState } from "react";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { useIsAuthorizedProfile } from "@/app/_hooks/useIsAuthorizedProfile";

export default function RecipeList() {
  const { profile } = useProfile();
  const isAuthenticatedProfile = useIsAuthorizedProfile();

  const [searchRecipe, setSearchRecipe] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState<RecipePopulatedProps[]>(profile.recipes);

  if (profile?.recipes.length === 0 || !profile?.recipes) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  const handleSearchChange = (query: string) => {
    setSearchRecipe(query);
  }

    useEffect(() => {
      searchRecipe ? setFilteredRecipes(
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
      ) : setFilteredRecipes(profile.recipes)
    }, [searchRecipe])

  return <>
    {profile.recipes && <SelectedRecipe />}
    <SearchRecipe searchRecipe={searchRecipe} handleSearchChange={handleSearchChange} />
    <RecipesListComponent
      profile={profile}
      recipes={filteredRecipes}
      isAuthenticatedProfile={isAuthenticatedProfile}
    />
  </>

}
