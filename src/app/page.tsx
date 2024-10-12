"use client";
import LoginForm from "./_components/LoginForm";
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";
import Link from "next/link";
import Image from "next/image";

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
            {loading ? null : (
              <>
                <h1 className="text-xl">
                  This page is in developement. I am still thinking of how i
                  want to design this page.
                </h1>
                <br />
                <h1 className="text-xl">All Recipes</h1>
                <div className="gap-10 flex flex-wrap">
                {recipes &&
                  recipes.map((recipe, index) => (
                    <div className="flex" key={index}>
                      <Link href={`/${recipe.user.username}/${recipe._id}`}>
                        <Image
                          className="h-24 w-auto"
                          src={recipe.image}
                          width={100}
                          height={100}
                          alt={recipe.title}
                        />
                        <p>
                          Recipe:{recipe.title} by {recipe.user.username}
                        </p>
                      </Link>
                    </div>
                  ))}
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
