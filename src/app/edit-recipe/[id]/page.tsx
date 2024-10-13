"use client";
import ErrorPage from "@/app/_components/ErrorPage";
import useFetchRecipe from "../_action/useFetchRecipe";
import { useAuth } from "@/app/context/AuthContext";
import EditRecipeForm from "../_components/EditRecipeForm";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { recipe, isVerified, loading } = useFetchRecipe(id);
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!loading &&
        (isAuthenticated && isVerified && recipe ? (
          <EditRecipeForm recipeEdit={recipe} />
        ) : (
          <ErrorPage />
        ))}
    </>
  );
}
