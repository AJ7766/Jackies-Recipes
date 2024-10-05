import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { recipeFormActions } from "@/app/_actions/recipeFormActions";

const imagePlaceholder = "/images/recipe-image-placeholder.svg";
const camera = "/images/test/camera.svg";

export default function AddRecipeForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { user, deleteCachedUser } = useAuth();
  const {
    recipe,
    isChecked,
    caloriesPlaceholder,
    imagePreview,
    handleImageChange,
    imageChange,
    handleTitleChange,
    handleAmountChange,
    handleUnitChange,
    handleIngredientChange,
    handleComponentChange,
    addComponent,
    removeComponent,
    addIngredient,
    removeIngredient,
    addNewComponent,
    handleServingsChange,
    toggleSlider,
    handleMacroChange,
    handleInstructionChange,
    addInstruction,
    removeInstruction,
  } = recipeFormActions();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    if (!user?._id) {
      throw new Error("User ID is not available");
    }
    try {
      let res = await fetch("/api/recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: recipe, userId: user?._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to create.");
      }
      deleteCachedUser();
      router.push(`/${user?.username}`);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create.");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <form className="addRecipeForm" onSubmit={handleSubmit}>
        <h1 className="addRecipeTitle">Add Recipe</h1>

        <div className="editRecipeImage" onClick={handleImageChange}>
          <Image
            height={250}
            width={400}
            className="editRecipeImagePreview"
            src={imagePreview || imagePlaceholder}
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
            width={50}
            height={50}
            src={camera}
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
              {ingredientList.component !== undefined && (
                <div className="addComponentsContainer">
                  <label className="recipeLabel" htmlFor="ingredients-for">
                    Component:
                  </label>
                  <input
                    type="text"
                    placeholder="Topping, frosting, sauce..."
                    value={ingredientList?.component || ""}
                    onChange={(e) =>
                      handleComponentChange(index, e.target.value)
                    }
                  />
                  <span
                    className="crossIcon"
                    onClick={() => removeComponent(index)}
                  ></span>
                </div>
              )}

              {ingredientList.ingredients.map((ing, ingIndex) => (
                <div className="addIngredientsContainer" key={ing.id}>
                  <label
                    className="recipeLabel tabular-nums"
                    htmlFor={`ingredient-${index}`}
                  >{`Ingredient ${ingIndex + 1}`}</label>
                  <input
                    type="number"
                    name="amount"
                    className="amount"
                    placeholder="700"
                    value={ing.amount || ""}
                    onChange={(e) => handleAmountChange(ing.id, e)}
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
                {ingredientList.component == undefined && (
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
              handleServingsChange(e);
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
                name="carbs"
                placeholder=""
                value={recipe.macros?.carbs || ""}
                onChange={handleMacroChange}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="protein">
                Protein:<i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                type="number"
                name="protein"
                placeholder=""
                value={recipe.macros?.protein || ""}
                onChange={handleMacroChange}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="fat">
                Fat:<i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                type="number"
                name="fat"
                placeholder=""
                value={recipe.macros?.fat || ""}
                onChange={handleMacroChange}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="recipeLabel" id="calories" htmlFor="calories">
                Calories:
              </label>
              <input
                type="number"
                name="calories"
                placeholder={caloriesPlaceholder || undefined}
                value={recipe.macros?.calories || ""}
                onChange={handleMacroChange}
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
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        </div>
        <button type="submit" disabled={loadingBtn}>
          Upload
        </button>
      </form>
    </>
  );
}
