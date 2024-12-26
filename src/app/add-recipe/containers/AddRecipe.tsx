"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { fetchPostRecipeAPI } from "@/app/add-recipe/services/fetchPostRecipeAPI";
import AddRecipeComponent from "../components/AddRecipeComponent";
import { calculateCalories, createField, createIngredientComponent, createInstruction, deleteIngredientComponent, deleteInstruction, updateIngredientComponent, updateInstruction } from "@/app/_services/recipeServices";
import { convertFileToBase64, convertFileToFormData, validateImage } from "@/_utils/imageUtils";
import { fetchUpdateImageAPI } from "@/app/settings/services/fetchUpdateImageAPI";
import { RecipeFormProps } from "@/_types/RecipeTypes";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState<RecipeFormProps>({
    title: "",
    image: '',
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
    servings: 0,
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
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { user } = useAuth();
  const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<string>();
  const [isChecked, setIsChecked] = useState(false);
  const [cloudinaryData, setCloudinaryData] = useState<FormData>();
  const router = useRouter();

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
        const formData = convertFileToFormData(validatedFile, '');
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

    try {
      setLoadingBtn(true);
      if (!cloudinaryData) {
        alert("Please upload an image file (JPEG, PNG, WEBP).");
        return;
      }
      let updatedRecipeData: RecipeFormProps = { ...recipe };
      const { data_url } = await fetchUpdateImageAPI(cloudinaryData);
      updatedRecipeData = {
        ...recipe,
        image: data_url
      };

      const { message, success } = await fetchPostRecipeAPI(updatedRecipeData);

      if (!success) {
        setMessage(message);
        setLoadingBtn(false);
        return;
      }
      sessionStorage.clear();
      router.push(`/${user?.username}`);
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

  return (
    <AddRecipeComponent
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
    />
  );
}
