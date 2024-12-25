"use client"
import { useState } from "react";
import { RecipeListComponent } from "../_components/RecipeListComponent";
import { Loader } from "../_components/Loader";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import dynamic from "next/dynamic";
import { RecipeProps } from "@/_models/RecipeModel";
const SelectedRecipe = dynamic(() => import("./SelectedRecipe"), { ssr: true });

export default function Dashboard({serverRecipes}: {serverRecipes: RecipeProps[]}) {
  const [loading, setLoading] = useState(0);
  const [recipes, setRecipes] = useState<RecipeProps[]>(serverRecipes);
  const [isClient, setIsClient] = useState(false);
  const { recipe } = useSelectedRecipe();
/*
  const [recipes, setRecipes] = useState<RecipeProps[]>(() => {
    if (typeof window !== 'undefined') {
      const sessionStorageRecipes = sessionStorage.getItem("recipes");
      if (sessionStorageRecipes) {
        setLoading(prev => prev + 1);
        return JSON.parse(sessionStorageRecipes)
      }
    }
    return null;
  });

  useEffect(() => {
    setIsClient(true);

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
  */
  if (recipes && recipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return <>
    {(isClient && window.innerWidth >= 1024) && <Loader loading={loading} />}
      {recipe && <SelectedRecipe />}
    {recipes && <RecipeListComponent recipes={recipes} />}
  </>
}
