"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import MasonaryComponent from "../_components/MasonaryComponent";
import { Types } from "mongoose";
import { LoadingSpinner } from "../_components/LoadingSpinner";
import { createMasonary } from "../_services/masonaryServices";
import { RecipePopulatedProps } from "@/_models/RecipeModel";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function Dashboard({ serverRecipes }: { serverRecipes: RecipePopulatedProps[] }) {
  const [recipes, setRecipes] = useState<RecipePopulatedProps[]>(serverRecipes);
  const [totalColumns, setTotalColumns] = useState<number>(5);
  const [columns, setColumns] = useState<RecipeCardProps[][] | null>(null);

  useLayoutEffect(() => {
    setTotalColumns(window.innerWidth > 768 ? 5 : 3)
  }, [])

  useEffect(() => {
    const fetchRecipes = async () => {
      if (recipes) {
        const masonaryColumns = await createMasonary(recipes, totalColumns);
        setColumns(masonaryColumns);
      }
    };
    fetchRecipes();
  }, []);

  if (!columns) {
    return <LoadingSpinner />;
  }

  if (columns.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return <MasonaryComponent columns={columns || null} />;
}
