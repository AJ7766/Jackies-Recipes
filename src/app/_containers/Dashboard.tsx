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

  useEffect(() => {
    const updateColumns = () => {
      setTotalColumns(window.innerWidth > 768 ? 5 : 3);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (serverRecipes && totalColumns) {
        const masonaryColumns = await createMasonary(serverRecipes, totalColumns);
        setColumns(masonaryColumns);
      }
    };
    fetchRecipes();
  }, [serverRecipes, totalColumns]);

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
