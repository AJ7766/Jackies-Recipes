import React from "react";
import { RecipeProps } from '@/_types/RecipeTypes';
import { RecipeCard } from "./RecipeCard";
import { UserProps } from "@/_types/UserTypes";

export const RecipeList = React.memo(({ recipes, profile, ownProfile }: { recipes: RecipeProps[], profile: UserProps, ownProfile?: boolean }) => {

  if (recipes && recipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }
  
  return (
    <>
      <div className="recipe-wrapper">
        {recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <RecipeCard recipe={recipe} profile={profile || recipe.user} ownProfile={ownProfile} />
          </div>
        ))}
      </div >
    </>
  )
})