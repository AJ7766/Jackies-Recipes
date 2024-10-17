"use client";
import LoginForm from "./_components/LoginForm";
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";
import Link from "next/link";
import Image from "next/image";
import Masonary from "./_components/Masonary";
import { LoadingSpinner } from "./_components/LoadingSpinner";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<SimplifiedRecipeProps[]>();
  const { user, isAuthenticated, initializing } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchRecipes = async () => {
        try {
          setLoading(true);
          let res = await fetch(`/api/all-recipes`, {
            method: "GET",
          });
          if (!res.ok) {
            throw new Error(
              `Failed to fetch recipes: ${res.status} - ${res.statusText}`
            );
          }
          const data = await res.json();
          setRecipes(data.recipes);
        } catch (error: any) {
          console.error("Error fetching recipes:", error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipes();
    }
  }, [isAuthenticated, user]);
  return (
    !initializing && (
      <>
        {isAuthenticated && user ? (
          <>
            <h1 className="text-xl text-center">
              This page is in developement. I am still thinking of how i want to
              design this page.
            </h1>
            <br />
            <h1 className="text-xl text-center mb-10">All Recipes</h1>
            {loading ? <LoadingSpinner /> : (
              <>
                <div className="gap-10 flex flex-wrap justify-center">
                  <Masonary recipes={recipes || []} />
                </div>
              </>
            )}
          </>
        ) : (
          <LoginForm />
        )}
      </>
    )
  );
}
