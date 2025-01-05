"use client"
import { RecipeListComponent } from "../_components/RecipeListComponent";
import { useSelectedRecipe } from "../_context/SelectedRecipeContext";
import dynamic from "next/dynamic";
import { RecipeProps } from "@/_types/RecipeTypes";
import { Loader } from "../_components/Loader";
const SelectedRecipe = dynamic(() => import("./SelectedRecipe"),
  {
    ssr: true,
    loading: () => <Loader />
  });

export default function Dashboard({ serverRecipes }: { serverRecipes: RecipeProps[] }) {
  const { recipe } = useSelectedRecipe();

  if (serverRecipes && serverRecipes.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return <>
    {recipe && <SelectedRecipe />}
    {serverRecipes && <RecipeListComponent recipes={serverRecipes} />}
  </>
}
