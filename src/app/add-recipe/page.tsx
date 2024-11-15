"use client";
import ErrorPage from "../_errors/ErrorPage";
import { useAuth } from "../context/AuthContext";
import AddRecipeForm from "./_components/AddRecipeForm";

export default function AddRecipe() {
  const { initializing, user, isAuthenticated } = useAuth();

  return (
    <>
      {!initializing &&
        (isAuthenticated && user ? <AddRecipeForm /> : <ErrorPage />)}
    </>
  );
}
