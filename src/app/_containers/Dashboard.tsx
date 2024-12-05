"use client"
import { useEffect, useState } from "react";
import { fetchRecipesAPI } from "../_services/api/fetchRecipesAPI";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { MasonryComponent } from "../_components/MasonryComponent";
import { LoadingSpinner } from "../_components/LoadingSpinner";


export default function Dashboard({ serverRecipes }: { serverRecipes?: RecipePopulatedProps[] }) {
  const [recipes, setRecipes] = useState<RecipePopulatedProps[]>( serverRecipes)

  useEffect(() => {
    const fetchRecipes = async () => {
      const { fetchedRecipes } = await fetchRecipesAPI();
      clientRecipes = fetchedRecipes;
      if (fetchedRecipes) {
        sessionStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
      }
    };
    fetchRecipes();
  }, [])

  if (!recipes)
    return <LoadingSpinner />

  if (recipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return <MasonryComponent recipes={recipes} />;
}
