import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Resizer from "react-image-file-resizer";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import {
  SimplifiedRecipeProps,
  ComponentProps,
  IngredientProps,
  IngredientListProps,
  MacroNutrientsProps,
  InstructionProps,
} from "@/models/UserRecipe";
import DeleteRecipe from "../_action/deleteRecipe";
import { useRouter } from "next/navigation";

const camera = "/images/test/camera.svg";
const imagePlaceholder = "/images/recipe-image-placeholder.svg";

export default function EditRecipeForm({
  recipeEdit,
}: {
  recipeEdit: SimplifiedRecipeProps;
}) {
  const [imagePreview, setImagePreview] = useState<string>();
  const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<string>();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [recipe, setRecipe] = useState<SimplifiedRecipeProps>(recipeEdit);
  const [isChecked, setIsChecked] = useState(true);
  const [success, setSuccess] = useState("");
  const [successBoolean, setSuccessBoolean] = useState(false);
  const [error, setError] = useState("");
  const [errorBoolean, setErrorBoolean] = useState(false);

  const { user, updateProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let calsFromCarbs: number = 0;
    let calsFromProtein: number = 0;
    let calsFromFat: number = 0;

    if (recipe.macros?.carbs !== undefined && recipe.macros?.carbs !== null) {
      calsFromCarbs = Number(recipe.macros.carbs) * 4;
    }

    if (
      recipe.macros?.protein !== undefined &&
      recipe.macros?.protein !== null
    ) {
      calsFromProtein = Number(recipe.macros.protein) * 4;
    }

    if (recipe.macros?.fat !== undefined && recipe.macros?.fat !== null) {
      calsFromFat = Number(recipe.macros.fat) * 9;
    }

    const totalCals = calsFromCarbs + calsFromProtein + calsFromFat;
    if (totalCals > 0) {
      const calsToString = totalCals.toString();
      setCaloriesPlaceholder(calsToString);
      return;
    }
    setCaloriesPlaceholder(undefined);
    return;
  }, [recipe]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    if (!user?._id) {
      throw new Error("User ID is not available");
    }
    try {
      let res = await fetch("/api/edit-recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: recipe, userId: user?._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to update.");
      } else if (res.ok) {
        const data = await res.json();
        updateProfile(data.updatedUser);
        setErrorBoolean(false);
        setSuccessBoolean(true);
        setSuccess(data.message);
        router.push(`/${user.username}`);
      }
    } catch (error: any) {
      setSuccessBoolean(false);
      setErrorBoolean(true);
      setError(error.message || "Failed to update.");
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleRecipeImageChange = (newImg: string) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, image: newImg }));
    setImagePreview(newImg);
  };

  const handleTitleChange = (newValue: string) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, title: newValue }));
  };

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 20 * 1024 * 1024;

      if (!allowedMimeTypes.includes(file.type)) {
        alert("Please upload an image file (JPEG, PNG, WEBP).");
        return;
      }

      if (file.size > maxSize) {
        alert("File size exceeds 20 MB.");
        return;
      }
      try {
        Resizer.imageFileResizer(
          file,
          1280, // max width
          850, // max height
          "JPEG", // format
          90, // quality
          0, // rotation
          (uri) => {
            if (typeof uri === "string") {
              handleRecipeImageChange(uri);
              console.log(uri);
            } else {
              console.error("Unexpected type:", uri);
            }
          },
          "base64" // output type
        );
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  const handleImageChange = () => {
    document.getElementById("imageInput")?.click();
  };

  const handleAmountChange = (id: string, newValue: number) => {
    const updatedIngredients = recipe.ingredients?.map((ingList) => {
      const updatedIngredientList = ingList.ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, amount: newValue };
        }
        return ing;
      });
      return { ...ingList, ingredients: updatedIngredientList };
    });

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const maxFiveInputs = (value: number) => {
    if (value < 0) {
      return 0;
    }

    if (value > 99999) {
      return 99999;
    }
    return value;
  };

  const handleUnitChange = (id: string, newValue: string) => {
    const updatedIngredients = recipe.ingredients?.map((ingList) => {
      const updatedIngredientList = ingList.ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, unit: newValue };
        }
        return ing;
      });
      return { ...ingList, ingredients: updatedIngredientList };
    });
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients || [],
    }));
  };

  const handleComponentChange = (id: string, newValue: string) => {
    const updatedIngredients =
      recipe.ingredients?.map((ingList) => {
        const updatedComponents =
          ingList.component?.map((comp) => {
            if (comp.id === id) {
              return { ...comp, component: newValue };
            }
            return comp;
          }) || [];

        return {
          ...ingList,
          component: updatedComponents,
        };
      }) || [];

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const addComponent = (index: number) => {
    const newComponent: ComponentProps = {
      id: uuidv4(),
      component: "",
    };
    const updatedIngredients = recipe.ingredients?.map((ingList, idx) => {
      if (idx === index) {
        return {
          ...ingList,
          component: [...(ingList.component || []), newComponent],
        };
      }
      return ingList;
    });
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients || [],
    }));
  };

  const removeComponent = (id: string) => {
    const updatedIngredients = recipe.ingredients?.map((ingList) => {
      return {
        ...ingList,
        component: ingList.component?.filter((comp) => comp.id !== id) || [],
      };
    });

    const filteredIngredients =
      updatedIngredients?.filter(
        (ingList) =>
          ingList.ingredients.length > 0 ||
          (ingList.component && ingList.component.length > 0)
      ) || [];

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: filteredIngredients || [],
    }));
  };

  const handleIngredientChange = (id: string, newValue: string) => {
    const updatedIngredients = recipe.ingredients.map((ingList) => {
      const updatedIngredientList = ingList.ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, ingredient: newValue };
        }
        return ing;
      });
      return { ...ingList, ingredients: updatedIngredientList };
    });
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const addIngredient = (index: number) => {
    const newIngredient: IngredientProps = {
      id: uuidv4(),
      amount: undefined,
      unit: "",
      ingredient: "",
    };
    const updatedIngredients = recipe.ingredients?.map((ingList, idx) => {
      if (idx === index) {
        return {
          ...ingList,
          ingredients: [...ingList.ingredients, newIngredient],
        };
      }
      return ingList;
    });
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients || [],
    }));
  };

  const removeIngredient = (id: string) => {
    const updatedIngredients = recipe.ingredients?.map((ingList) => {
      return {
        ...ingList,
        ingredients: ingList.ingredients?.filter((ing) => ing.id !== id) || [],
      };
    });

    const filteredIngredients =
      updatedIngredients?.filter(
        (ingList) =>
          ingList.ingredients.length > 0 ||
          (ingList.component && ingList.component.length > 0)
      ) || [];

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: filteredIngredients || [],
    }));
  };

  const addNewComponent = () => {
    const newIngredientList: IngredientListProps = {
      component: [
        {
          id: uuidv4(),
          component: "",
        },
      ],
      ingredients: [
        {
          id: uuidv4(),
          ingredient: "",
          amount: undefined,
          unit: "",
        },
      ],
    };
    const updatedIngredients = [
      ...(recipe.ingredients || []),
      newIngredientList,
    ];
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: updatedIngredients,
    }));
  };

  const handleServingsChange = (newValue: number) => {
    setRecipe((prevList) => ({
      ...prevList,
      servings: newValue,
    }));
  };

  const maxTwoInputs = (value: number) => {
    if (value < 0) {
      return 0;
    }
    if (value > 99) {
      return 99;
    }
    return value;
  };

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
  };

  const handleMacroChange = (macros: Partial<MacroNutrientsProps>) => {
    setRecipe((prevList) => ({
      ...prevList,
      macros: {
        ...prevList.macros,
        ...macros,
      },
    }));
  };

  const handleCarbsChange = (newValue: number) => {
    handleMacroChange({ carbs: newValue });
  };

  const handleProteinChange = (newValue: number) => {
    handleMacroChange({ protein: newValue });
  };

  const handleFatChange = (newValue: number) => {
    handleMacroChange({ fat: newValue });
  };

  const handleCaloriesChange = (newValue: number) => {
    handleMacroChange({ calories: newValue });
  };

  const negativeNumber = (value: number) => {
    if (value < 0) {
      return 0;
    }

    if (value > 9999) {
      return 9999;
    }
    return value;
  };

  const handleInstructionChange = (id: string, newValue: string) => {
    const updatedInstructions = recipe.instructions?.map((ins) => {
      if (ins.id === id) {
        return { ...ins, instruction: newValue };
      }
      return ins;
    });
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: updatedInstructions,
    }));
  };

  const addInstruction = () => {
    const newInstruction: InstructionProps = {
      id: uuidv4(),
      instruction: "",
    };
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...(prevRecipe.instructions || []), newInstruction],
    }));
  };

  const removeInstruction = (id: string) => {
    const updatedInstructions = recipe.instructions?.filter(
      (ins) => ins.id !== id
    );
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: updatedInstructions,
    }));
  };

  return (
    <>
      <form className="addRecipeForm" onSubmit={handleSubmit}>
        <h1 className="addRecipeTitle">Edit Recipe</h1>

        <div className="editRecipeImage" onClick={handleImageChange}>
          <Image
            height={250}
            width={400}
            className="editRecipeImagePreview"
            src={imagePreview || recipeEdit.image || imagePlaceholder}
            alt="recipe-image"
          />
          <input
            id="imageInput"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={imageChange}
          />
          <Image
            className="editCamera"
            src={camera}
            width={50}
            height={50}
            alt="camera"
          />
        </div>
        <div className="recipeSpace"></div>

        <div className="recipeTitleContainer">
          <label className="recipeLabel" htmlFor="recipe-name">
            Recipe Name:
          </label>
          <input
            type="text"
            placeholder="Pasta Carbonara"
            value={recipe.title || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>
        <div className="recipeSpace"></div>

        {recipe.ingredients &&
          recipe.ingredients.map((ingredientList, index) => (
            <div className="recipe" key={index}>
              {ingredientList.component?.map((comp, compIndex) => (
                <div className="addComponentsContainer" key={compIndex}>
                  <label className="recipeLabel" htmlFor="ingredients-for">
                    Component:
                  </label>
                  <input
                    type="text"
                    placeholder="Topping, frosting, sauce..."
                    value={comp.component}
                    onChange={(e) =>
                      handleComponentChange(comp.id, e.target.value)
                    }
                  />
                  <span
                    className="crossIcon"
                    onClick={() => removeComponent(comp.id)}
                  ></span>
                </div>
              ))}

              {ingredientList.ingredients.map((ing, ingIndex) => (
                <div className="addIngredientsContainer" key={ing.id}>
                  <label
                    className="recipeLabel tabular-nums"
                    htmlFor={`ingredient-${index}`}
                  >{`Ingredient ${ingIndex + 1}`}</label>
                  <input
                    type="number"
                    className="amount"
                    placeholder="700"
                    value={ing.amount || ""}
                    onChange={(e) => {
                      const limitedValue = maxFiveInputs(+e.target.value);
                      handleAmountChange(ing.id, limitedValue);
                    }}
                  />
                  <input
                    type="text"
                    className="unit"
                    placeholder="g"
                    value={ing.unit}
                    onChange={(e) => handleUnitChange(ing.id, e.target.value)}
                  />
                  <input
                    type="text"
                    className="ingredient"
                    placeholder="Butter"
                    value={ing.ingredient}
                    onChange={(e) =>
                      handleIngredientChange(ing.id, e.target.value)
                    }
                  />
                  <span
                    onClick={() => removeIngredient(ing.id)}
                    className="crossIcon"
                  ></span>
                </div>
              ))}
              <div className="addButtons">
                <button type="button" onClick={() => addIngredient(index)}>
                  Add Ingredient
                </button>
                {(!ingredientList.component ||
                  ingredientList.component.length === 0) && (
                  <button type="button" onClick={() => addComponent(index)}>
                    Add Component
                  </button>
                )}
              </div>
            </div>
          ))}
        <div className="addButtons">
          <button type="button" onClick={() => addNewComponent()}>
            Add Component
          </button>
        </div>

        <div className="recipeSpace"></div>
        <div className="addServingsContainer">
          <label className="recipeLabel" htmlFor="servings">
            Servings:
          </label>
          <input
            type="number"
            value={recipe.servings || ""}
            onChange={(e) => {
              const limitedValue = maxTwoInputs(+e.target.value);
              handleServingsChange(limitedValue);
            }}
          />
        </div>
        <div className="recipeSpace"></div>
        <div className="addRecipeSwitchContainer">
          <h1>Nutritional values:</h1>
          <label className="sliderContainer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleSlider}
            />
            <span className="slider"></span>
          </label>
        </div>
        {isChecked && (
          <>
            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="carbohydrates">
                Carbohydrates:
                <i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                type="number"
                placeholder=""
                value={recipe.macros?.carbs || ""}
                onChange={(e) => {
                  const limitedValue = negativeNumber(+e.target.value);
                  handleCarbsChange(limitedValue);
                }}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="protein">
                Protein:<i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                type="number"
                placeholder=""
                value={recipe.macros?.protein || ""}
                onChange={(e) => {
                  const limitedValue = negativeNumber(+e.target.value);
                  handleProteinChange(limitedValue);
                }}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="fat">
                Fat:<i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                type="number"
                placeholder=""
                value={recipe.macros?.fat || ""}
                onChange={(e) => {
                  const limitedValue = negativeNumber(+e.target.value);
                  handleFatChange(limitedValue);
                }}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="recipeLabel" id="calories" htmlFor="calories">
                Calories:
              </label>
              <input
                type="number"
                placeholder={caloriesPlaceholder || undefined}
                value={recipe.macros?.calories || ""}
                onChange={(e) => {
                  const limitedValue = negativeNumber(+e.target.value);
                  handleCaloriesChange(limitedValue);
                }}
              />
            </div>
          </>
        )}
        <div className="recipeSpace"></div>
        {recipe.instructions &&
          recipe.instructions.map((ins, index) => (
            <div className="addInstructionsContainer" key={ins.id}>
              <label
                className="recipeLabel tabular-nums"
                htmlFor={`instruction-${index}`}
              >{`Instruction ${index + 1}`}</label>
              <textarea
                placeholder=""
                rows={3}
                value={ins.instruction}
                onChange={(e) =>
                  handleInstructionChange(ins.id, e.target.value)
                }
              />
              <span
                onClick={() => removeInstruction(ins.id)}
                className="crossIcon"
              ></span>
            </div>
          ))}
        <div className="addButtons">
          <button type="button" onClick={addInstruction}>
            Add instruction
          </button>
        </div>

        <div className="h-5">
          {errorBoolean ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div></div>
          )}
          {successBoolean ? (
            <div className="text-green-600">{success}</div>
          ) : (
            <div></div>
          )}
        </div>
        <button type="submit" disabled={loadingBtn}>
          Save
        </button>
        <button
          type="button"
          className="removeRecipeBtn"
          onClick={() => {
            if (recipe._id) {
              DeleteRecipe({ id: recipe._id, username: user?.username });
            }
          }}
        >
          Delete
        </button>
      </form>
    </>
  );
}
