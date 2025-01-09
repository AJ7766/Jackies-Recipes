import React from "react";
import { RecipeProps } from '@/_types/RecipeTypes';
import { RecipeCard } from "./ui/RecipeCard";

export const RecipeList = React.memo(({ recipes }: { recipes: RecipeProps[] }) => {
  return (
    <>
      <h1 className="text-xl text-center mb-5 mt-5 font-metropolis">Latest Recipes</h1>
      <div className="recipe-wrapper">
        {recipes.map((recipe, recipeIndex) => (
          <div className="recipe-container" key={recipeIndex}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div >
    </>
  )
})