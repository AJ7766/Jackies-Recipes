"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { Types } from "mongoose";
import { createMasonary } from "../_services/masonaryServices";
import { MasonaryComponent } from "../_components/MasonaryComponent";
import { fetchRecipesAPI } from "../_services/api/fetchRecipesAPI";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function Dashboard() {
  const [totalColumns, setTotalColumns] = useState<number>(
    typeof window !== "undefined" && window.innerWidth > 768 ? 5 : 3
  );
  const [columns, setColumns] = useState<RecipeCardProps[][]>(() => {
    if(typeof window !== "undefined"){
      const storedColumns = sessionStorage.getItem("columns");
      if (storedColumns) {
        return JSON.parse(storedColumns)
      }
    }
    return null;
  });

  useEffect(() => {
    if (!columns) {
      const fetchRecipes = async () => {
        const { recipes } = await fetchRecipesAPI();
        if (recipes) {
          const masonaryColumns = await createMasonary(recipes, totalColumns);
          sessionStorage.setItem('columns', JSON.stringify(masonaryColumns));
          setColumns(masonaryColumns);
        }
      };
      fetchRecipes();
    }
  }, [totalColumns])

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
