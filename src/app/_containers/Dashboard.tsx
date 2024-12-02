"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { Types } from "mongoose";
import { createMasonary } from "../_services/masonaryServices";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { MasonaryComponent } from "../_components/MasonaryComponent";
import { getRecipesController } from "../_ssr/recipes/recipesController";
import { fetchRecipesAPI } from "../_services/api/fetchRecipesAPI";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function Dashboard() {
  const [totalColumns, setTotalColumns] = useState<number>(5);
  const [columns, setColumns] = useState<RecipeCardProps[][]>();

  useLayoutEffect(() => {
    setTotalColumns(window.innerWidth > 768 ? 5 : 3);
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedColumns = sessionStorage.getItem("columns");
      if (storedColumns) {
        console.log("cached columns")
        setColumns(JSON.parse(storedColumns))
        return;
      }
      fetchRecipes();
    }
  }, [])

  const fetchRecipes = async () => {
    const {recipes} = await fetchRecipesAPI();
    if (recipes) {
      const masonaryColumns = await createMasonary(recipes, totalColumns);
      sessionStorage.setItem('columns', JSON.stringify(masonaryColumns));
      console.log("setting new columns", masonaryColumns)
      setColumns(masonaryColumns);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("removing columns");
      sessionStorage.removeItem('columns');
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
