"use client"
import { useEffect, useState } from "react";
import { fetchRecipesAPI } from "../_services/api/fetchRecipesAPI";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { MasonryComponent } from "../_components/MasonryComponent";
import { Loader } from "../_components/Loader";

export default function Dashboard() {
  const [loading, setLoading] = useState(0);
  const [recipes, setRecipes] = useState<RecipePopulatedProps[]>(() => {
    if (typeof window !== "undefined") {
      const sessionStorageRecipes = sessionStorage.getItem("recipes");
      if (sessionStorageRecipes) {
        setLoading(prev => prev + 1);
        return JSON.parse(sessionStorageRecipes)
      }
    }
    return null;
  });
  useEffect(() => {
    if (!recipes) {
      const fetchRecipes = async () => {
        const { fetchedRecipes } = await fetchRecipesAPI();
        setRecipes(fetchedRecipes);
        if (fetchedRecipes) {
          setLoading(prev => prev + 1);
          sessionStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
        }
      };
      fetchRecipes();
    }
  }, [])

  if (recipes && recipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return <>
    <Loader loading={loading} />
    <MasonryComponent recipes={recipes || null} />;
  </>
}
