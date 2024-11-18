import { useEffect, useState } from "react";
import MasonaryComponent from "../_components/MasonaryComponent";
import { fetchRecipesAPI } from "../_services/api/fetchRecipesAPI";
import { Types } from "mongoose";
import { LoadingSpinner } from "../_components/LoadingSpinner";
import { createMasonary } from "../_services/masonaryServices";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
  user: { username: string };
}

export default function Dashboard() {
  const [totalColumns, setTotalColumns] = useState<number>(
    window.innerWidth > 768 ? 5 : 3
  );
  const [columns, setColumns] = useState<RecipeCardProps[][] | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { recipes } = await fetchRecipesAPI();
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
