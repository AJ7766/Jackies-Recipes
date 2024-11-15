import { RecipePopulatedProps } from "@/models/RecipeModel";
import { useEffect, useState } from "react";
import MasonaryComponent from "../_components/MasonaryComponent";
import { fetchRecipesAPI } from "../_services/fetchRecipesAPI";
import { Types } from "mongoose";
import { LoadingSpinner } from "../_components/LoadingSpinner";

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
        await createMasonary(recipes);
      }
    };
    fetchRecipes();
  }, []);

  const createMasonary = async (recipes: RecipePopulatedProps[]) => {
    const newColumns: RecipeCardProps[][] = Array.from(
      { length: totalColumns },
      () => []
    );

    recipes.reduce((currentColumns, recipe, index) => {
      const recipeCard: RecipeCardProps = {
        id: recipe._id,
        title: recipe.title,
        image: recipe.image || "",
        user: {
          username: recipe.user.username || "",
        },
      };
      currentColumns[index % totalColumns].push(recipeCard);
      return currentColumns;
    }, newColumns);

    setColumns(newColumns);
  };

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
