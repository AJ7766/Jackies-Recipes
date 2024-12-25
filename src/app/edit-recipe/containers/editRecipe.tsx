"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { fetchGetRecipeAPI } from "../services/fetchGetRecipeAPI";
import EditRecipeComponent from "../_components/EditRecipeComponent";
import { calculateCalories, createField, createIngredientComponent, createInstruction, deleteIngredientComponent, deleteInstruction, updateIngredientComponent, updateInstruction } from "@/app/_services/recipeServices";
import ErrorPage from "@/app/_errors/ErrorPage";
import { fetchUpdateRecipeAPI } from "../services/fetchUpdateRecipeAPI";
import { useRouter } from "next/navigation";
import { RecipeFormProps } from "@/_models/RecipeModel";
import { convertFileToBase64, convertFileToFormData, getPublicId, validateImage } from "@/_utils/imageUtils";
import { fetchUpdateImageAPI } from "@/app/settings/services/fetchUpdateImageAPI";

export default function EditRecipe({ recipe_id }: { recipe_id: string }) {
    const [recipe, setRecipe] = useState<RecipeFormProps>({
        title: "",
        image: "",
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
    });
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [message, setMessage] = useState("");
    const { user } = useAuth();
    const [userHasRecipe, setUserHasRecipe] = useState(false);
    const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<string>();
    const [isFetching, setIsFetcing] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [cloudinaryData, setCloudinaryData] = useState<FormData>();
    const [publicId, setPublicId] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchRecipeAPI = async () => {
            setIsFetcing(true);
            if(recipe_id){
                setIsFetcing(false);
                return alert("Invalid recipe ID");
            }

            const { message, fetchedRecipe, userHasRecipe } = await fetchGetRecipeAPI(recipe_id)

            if (!fetchedRecipe || !userHasRecipe) {
                console.error(message);
                setIsFetcing(false);
                return <ErrorPage />
            }
            setUserHasRecipe(userHasRecipe);
            setRecipe(fetchedRecipe);
            setIsFetcing(false);
            setPublicId(getPublicId(fetchedRecipe.image));
        }
        fetchRecipeAPI()
    }, [])

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
        const file = e.target.files?.[0];
        if (file) {
            const validatedFile = validateImage(file);
            if (validatedFile) {
                const formData = convertFileToFormData(validatedFile, publicId);
                setCloudinaryData(formData);
                const uri = await convertFileToBase64(validatedFile);
                if (uri) {
                    setRecipe((prevRecipe) => ({ ...prevRecipe, image: uri }));
                }
            }
        };
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
        if(!user) 
            throw new Error("Unauthorized");

        try {
            setLoadingBtn(true);
            let updatedRecipeData: RecipeFormProps = { ...recipe };
            if (cloudinaryData) {
                const { data_url } = await fetchUpdateImageAPI(cloudinaryData);
                updatedRecipeData = {
                    ...recipe,
                    image: data_url
                };
            }
            const { message, success } = await fetchUpdateRecipeAPI(updatedRecipeData);
            if (!success) {
                setLoadingBtn(false)
                throw new Error(message)
            }
            router.push(`/${user.username}`);
            router.refresh();
        } catch (error: any) {
            setMessage(error.message || "Failed to update.");
        } finally {
            setLoadingBtn(false);
        }
    }

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

    if (isFetching)
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
        handleInputDelete={handleInputDelete}
        handleInputCreate={handleInputCreate}
        caloriesPlaceholder={caloriesPlaceholder}
        isChecked={isChecked}
        toggleSlider={toggleSlider}
        username={user?.username || ''}
        recipe_id={recipe_id}
        public_id={publicId}
        router={router}
    />
}
