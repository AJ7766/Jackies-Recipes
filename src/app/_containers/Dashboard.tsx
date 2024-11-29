"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { Types } from "mongoose";
import { createMasonary } from "../_services/masonaryServices";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { MasonaryComponent } from "../_components/MasonaryComponent";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function Dashboard({ serverRecipes }: { serverRecipes: RecipePopulatedProps[] }) {
  const [totalColumns, setTotalColumns] = useState<number>(5);
  const [columns, setColumns] = useState<RecipeCardProps[][]>();
  const [isFreshLoad, setIsFreshLoad] = useState<boolean>(false);

  useLayoutEffect(() => {
    setTotalColumns(window.innerWidth > 768 ? 5 : 3);
  }, [])

  useEffect(() => {
    // On initial load (full-page reload)
    if (window.performance && performance.navigation.type === 1) {
      setIsFreshLoad(true); // Full page reload detected
    } else {
      setIsFreshLoad(false); // Normal navigation (using Next.js routing)
    }
  }, []);

  // Fetch recipes from server or use cached data (if available)
  useEffect(() => {
    const storedColumns = localStorage.getItem('columns');
    if (!isFreshLoad && storedColumns) {
      // Skip fetching from server and use cached columns
      setColumns(JSON.parse(storedColumns));
    } else {
      // Fetch recipes from the server and cache them
      const fetchRecipes = async () => {
        if (serverRecipes) {
          const masonaryColumns = await createMasonary(serverRecipes, totalColumns);
          setColumns(masonaryColumns);
          if (!isFreshLoad) {
            localStorage.setItem('columns', JSON.stringify(masonaryColumns)); // Cache columns for future navigation
          }
        }
      };
      fetchRecipes();
    }
  }, [serverRecipes, totalColumns, isFreshLoad]); // Refetch when dependencies change
  if (!columns)
    return null

  if (columns.length === 0) {
    return (
      <div className="noRecipesContainer">
        <h1>No recipes were found</h1>
      </div>
    );
  }

  return <MasonaryComponent columns={columns} />;
}
