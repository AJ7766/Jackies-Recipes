"use client";

import ErrorPage from "@/app/_components/ErrorPage";
import NavBar from "@/app/_components/NavBar";
import EditRecipeForm from "../_components/editRecipeForm";
import useFetchRecipe from "../_action/useFetchRecipe";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { recipe, isVerified, loading } = useFetchRecipe(id);

  return (
    <>
      <NavBar />
      {!loading &&
        (isVerified && recipe ? (
          <EditRecipeForm recipeEdit={recipe} />
        ) : (
          <ErrorPage />
        ))}
    </>
  );
}
