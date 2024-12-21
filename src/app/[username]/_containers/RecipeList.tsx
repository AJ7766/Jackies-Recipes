"use client"
import { useAuth } from "@/app/_context/AuthContext";
import { usePathname } from "next/navigation";
import { RecipesListComponent } from "../_components/RecipesListComponent";
import { useProfile } from "@/app/_context/ProfileContext";
import SelectedRecipe from "@/app/_containers/SelectedRecipe";
import { SearchRecipe } from "../_components/SearchRecipeComponent";
import { useEffect, useState } from "react";
import { RecipePopulatedProps } from "@/_models/RecipeModel";

export default function RecipeList() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const usernameLink = pathParts[1];
  const canEdit = user?.username === usernameLink;
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
      canEdit={canEdit}
    />
  </>

}
