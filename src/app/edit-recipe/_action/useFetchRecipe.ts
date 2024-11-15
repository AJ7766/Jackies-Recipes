import { useAuth } from "@/app/_context/AuthContext";
import { SimplifiedRecipeProps } from "@/_models/RecipeModel";
import { useEffect, useState } from "react";

export default function useFetchRecipe(recipeId: string) {
    const [recipe, setRecipe] = useState<SimplifiedRecipeProps>();
    const [userHasRecipe, setUserHasRecipe] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { initializing, user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!user || !token) {
            console.error("User or Token is not available");
            return;
        }
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipe?recipeId=${recipeId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Error fetching recipe");
                }
                const data = await response.json();
                setRecipe(data.recipe);
                data.userHasRecipe && setUserHasRecipe(true);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (recipeId) {
            fetchRecipe();
        }
    }, [initializing, recipeId]);

    return { initializing, recipe, userHasRecipe, loading };
}