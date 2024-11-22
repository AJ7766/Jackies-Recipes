"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { fetchGetRecipeAPI } from "../services/fetchGetRecipeAPI";
import mongoose from "mongoose";
import EditRecipeComponent from "../_components/EditRecipeComponent";
import { calculateCalories, createField, createIngredientComponent, createInstruction, deleteIngredientComponent, deleteInstruction, imageChange, updateIngredientComponent, updateInstruction } from "@/app/_services/recipeServices";
import ErrorPage from "@/app/_errors/ErrorPage";
import { fetchUpdateRecipeAPI } from "../services/fetchUpdateRecipeAPI";
import { useRouter } from "next/navigation";
import { RecipeFormProps } from "@/_models/RecipeModel";

export default function EditRecipe({ recipe_id }: { recipe_id: string }) {
    const [imagePreview, setImagePreview] = useState<string>();
    const [recipe, setRecipe] = useState<RecipeFormProps>({
        title: "",
        image: imagePreview || "",
        ingredients: [
            {
                component: "",
                ingredients: [
                    {
                        ingredient: "",
                        amount: undefined,
                        unit: "",
                    },
                ],
            },
        ],
        servings: undefined,
        macros: {
            carbs: undefined,
            protein: undefined,
            fat: undefined,
            calories: undefined,
        },
        instructions: [
            {
                instruction: "",
            },
        ],
    }); const [loadingBtn, setLoadingBtn] = useState(false);
    const [message, setMessage] = useState("");
    const { user, deleteCachedUser } = useAuth();
    const [token, setToken] = useState<string>("");
    const [userHasRecipe, setUserHasRecipe] = useState<boolean>(false);
    const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<string>();
    const [isFetching, setIsFetcing] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setToken(token);
    }, [token])

    useEffect(() => {
        if (!token) return;
        const fetchRecipeAPI = async () => {
            setIsFetcing(true);
            const { message, fetchedRecipe, userHasRecipe } = await fetchGetRecipeAPI(token, new mongoose.Types.ObjectId(recipe_id))

            if (!fetchedRecipe || !userHasRecipe) {
                console.error(message);
                setIsFetcing(false);
                return <ErrorPage />
            }
            setUserHasRecipe(userHasRecipe);
            setRecipe(fetchedRecipe);
            setImagePreview(fetchedRecipe.image);
            setIsFetcing(false);
        }
        fetchRecipeAPI()
    }, [token])

    useEffect(() => {
        if (
            recipe.macros?.carbs === 0 &&
            recipe.macros?.protein === 0 &&
            recipe.macros?.fat === 0 &&
            recipe.macros?.calories === 0
        )
            return;
        recipe.macros && setIsChecked(true);
        setCaloriesPlaceholder(calculateCalories(recipe));
    }, [recipe.macros]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const res = await imageChange(e);
        if (res) {
            const { message, uri } = res;
            if (message)
                throw new Error(message);

            if (typeof uri === 'string') {
                setRecipe((prevRecipe) => ({ ...prevRecipe, image: uri }));
                setImagePreview(uri);
            }
        }
    }

    const toggleSlider = () => {
        setRecipe((prevList) => ({
            ...prevList,
            macros: {
                carbs: 0,
                protein: 0,
                fat: 0,
                calories: 0,
            },
        }));
        setIsChecked((prevIsChecked) => !prevIsChecked);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user || !token) {
            throw new Error("User or Token is not available");
        }

        setLoadingBtn(true);
        
        const { message, success } = await fetchUpdateRecipeAPI(token, recipe, deleteCachedUser);
        if (!success) {
            setLoadingBtn(false)
            throw new Error(message)
        }
        router.push(`/${user.username}`);
        setLoadingBtn(false)
    };

    const handleInputCreate = (
        e: React.MouseEvent<HTMLButtonElement>,
        ing_list_index?: number,
    ) => {

        const data_set = e?.currentTarget.dataset.set;

        setRecipe((prevRecipe) => {
            // Create ingredient or component
            if ((data_set === "ingredient" || data_set === "component") && ing_list_index !== undefined) {
                return {
                    ...prevRecipe,
                    ingredients: createIngredientComponent(prevRecipe, data_set, ing_list_index)
                };
            }
            // Create field
            if (data_set === 'field') {
                return {
                    ...prevRecipe,
                    ingredients: createField(prevRecipe)
                }
            }
            // Create instruction
            if (data_set === "instruction") {
                return {
                    ...prevRecipe,
                    instructions: createInstruction(prevRecipe)
                }
            }
            return prevRecipe
        })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ing_list_index?: number,
        ing_index?: number,
        ins_index?: number
    ) => {
        const { name, value, dataset } = e.target;

        setRecipe((prevRecipe) => {
            // Updating component or ingredients
            if (
                (dataset.set === "ingredients" || dataset.set === "component") &&
                ing_list_index !== undefined
            ) {
                return {
                    ...prevRecipe,
                    ingredients: updateIngredientComponent(prevRecipe, name, value, dataset.set, ing_list_index, ing_index)
                }
            }
            // Updating macros
            if (name in (prevRecipe.macros || {})) {
                return {
                    ...prevRecipe,
                    macros: {
                        ...prevRecipe.macros,
                        [name]: value
                    },
                };
            }
            // Updating instructions
            if (dataset.set === "instruction" && ins_index !== undefined) {
                return {
                    ...prevRecipe,
                    instructions: updateInstruction(prevRecipe, name, value, ins_index)
                };
            }
            // Updating title, servings
            const newValue = dataset.set === 'servings' ? Number(value) : value;
            return {
                ...prevRecipe,
                [name]: newValue
            };
        });
    }

    const handleInputDelete = (
        e: React.MouseEvent<HTMLSpanElement>,
        ing_list_index?: number,
        ing_index?: number,
        ins_index?: number
    ) => {
        const data_set = e?.currentTarget.dataset.set;

        setRecipe((prevRecipe) => {
            // Delete component or ingredient
            if ((data_set === "ingredient" || data_set === "component") && ing_list_index !== undefined) {
                return {
                    ...prevRecipe,
                    ingredients: deleteIngredientComponent(prevRecipe, data_set, ing_list_index, ing_index)
                };
            }
            // Delete instruction
            if (data_set === "instruction" && ins_index !== undefined) {
                return {
                    ...prevRecipe,
                    instructions: deleteInstruction(prevRecipe, ins_index)
                };
            }
            return prevRecipe;
        });
    }

    if(isFetching)
        return null;

    if (!userHasRecipe)
        return <ErrorPage />;

    return <EditRecipeComponent
        recipe={recipe}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
        loadingBtn={loadingBtn}
        message={message}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        handleInputDelete={handleInputDelete}
        handleInputCreate={handleInputCreate}
        caloriesPlaceholder={caloriesPlaceholder}
        isChecked={isChecked}
        toggleSlider={toggleSlider}
        username={user?.username || ''}
        recipe_id={recipe_id}
        token={token}
        deleteCachedUser={deleteCachedUser}
        router={router}
    />
}
