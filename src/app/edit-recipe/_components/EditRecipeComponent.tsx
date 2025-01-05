import React from "react";
import Image from "next/image";
import { handleImageClick } from "@/app/_services/recipeServices";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CldImage } from "next-cloudinary";
import { RecipeFormProps } from "@/_types/RecipeTypes";
const camera = "/images/icons/camera.svg";

interface AddRecipeProps {
  recipe: RecipeFormProps;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ing_list_index?: number,
    ing_index?: number,
    ins_index?: number
  ) => void,
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void,
  handleInputDelete: (
    e: React.MouseEvent<HTMLSpanElement>,
    ing_list_index?: number,
    ing_index?: number,
    ins_index?: number
  ) => void;
  handleInputCreate: (
    e: React.MouseEvent<HTMLButtonElement>,
    ing_list_index?: number
  ) => void;
  isChecked: boolean;
  caloriesPlaceholder?: string;
  loadingBtn: boolean;
  message: string;
  toggleSlider: () => void;
  recipe_id: string;
  public_id: string;
  router: AppRouterInstance
}

export default function EditRecipeComponent({
  recipe,
  onSubmit,
  handleInputChange,
  loadingBtn,
  message,
  handleImageChange,
  handleInputDelete,
  handleInputCreate,
  isChecked,
  caloriesPlaceholder,
  toggleSlider,
  recipe_id,
  public_id,
  router
}: AddRecipeProps) {
  return (
    <>
      <form className="addRecipeForm" onSubmit={onSubmit}>
        <h1 className="addRecipeTitle">Edit your Recipe</h1>

        <div className="editRecipeImage" onClick={handleImageClick}>
          <CldImage
            className="editRecipeImagePreview h-revert-layer"
            height={300}
            width={300}
            src={recipe.image}
            alt="recipe-image"
            fetchPriority="high"
            aspectRatio={1}
            crop='fill'
            gravity="center"
            priority
          />
          <input
            id="imageInput"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
          <Image
            className="editCamera"
            width={100}
            height={100}
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
            name="title"
            type="text"
            placeholder="Pasta Carbonara"
            value={recipe.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="recipeSpace"></div>

        {recipe.ingredients &&
          recipe.ingredients.map((ingredientList, ing_list_index) => (
            (ingredientList.component || ingredientList.ingredients.length > 0) && (
              <div className="recipe" key={ing_list_index}>
                {ingredientList.component !== undefined && (
                  <div className="addComponentsContainer">
                    <label className="recipeLabel" htmlFor="ingredients-for">
                      Component:
                    </label>
                    <input
                      name="component"
                      data-set="component"
                      type="text"
                      placeholder="Topping, frosting, sauce..."
                      value={ingredientList?.component || ""}
                      onChange={(e) => handleInputChange(e, ing_list_index)}
                    />
                    <span
                      className="crossIcon"
                      data-set="component"
                      onClick={(e) => handleInputDelete(e, ing_list_index, undefined, undefined)}
                    ></span>
                  </div>
                )}

                {ingredientList.ingredients.map((ing, ing_index) => (
                  <div className="addIngredientsContainer" key={ing_index}>
                    <label
                      className="recipeLabel tabular-nums"
                      htmlFor={`ingredient-${ing_list_index}`}
                    >{`Ingredient ${ing_index + 1}`}</label>
                    <input
                      name="amount"
                      data-set="ingredients"
                      type="number"
                      className="amount"
                      placeholder="700"
                      value={ing.amount || ""}
                      onChange={(e) =>
                        handleInputChange(e, ing_list_index, ing_index)
                      }
                    />
                    <input
                      name="unit"
                      data-set="ingredients"
                      type="text"
                      className="unit"
                      placeholder="g"
                      value={ing.unit}
                      onChange={(e) =>
                        handleInputChange(e, ing_list_index, ing_index)
                      }
                    />
                    <input
                      name="ingredient"
                      data-set="ingredients"
                      type="text"
                      className="ingredient"
                      placeholder="Butter"
                      value={ing.ingredient}
                      onChange={(e) =>
                        handleInputChange(e, ing_list_index, ing_index)
                      }
                    />
                    <span
                      onClick={(e) =>
                        handleInputDelete(e, ing_list_index, ing_index)
                      }
                      data-set="ingredient"
                      className="crossIcon"
                    ></span>
                  </div>
                ))}
                <div className="addButtons">
                  <button
                    type="button"
                    data-set="ingredient"
                    onClick={(e) => handleInputCreate(e, ing_list_index)}
                  >
                    Add Ingredient
                  </button>
                  {ingredientList.component == undefined && (
                    <button
                      type="button"
                      data-set="component"
                      onClick={(e) => handleInputCreate(e, ing_list_index)}
                    >
                      Add Component
                    </button>
                  )}
                </div>
              </div>
            )))}

        <div className="addButtons">
          <button type="button" data-set="field"
            onClick={(e) => handleInputCreate(e)}
          >
            Add New Field
          </button>
        </div>

        <div className="recipeSpace"></div>
        <div className="addServingsContainer">
          <label className="recipeLabel" htmlFor="servings">
            Servings:
          </label>
          <input
            name="servings"
            data-set="servings"
            type="number"
            value={recipe.servings || ''}
            onChange={handleInputChange}
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
                name="carbs"
                data-set="macro"
                type="number"
                placeholder=""
                value={recipe.macros?.carbs || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="protein">
                Protein:<i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                name="protein"
                data-set="macro"
                type="number"
                placeholder=""
                value={recipe.macros?.protein || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="nutritionLabel" htmlFor="fat">
                Fat:<i className="opacity-50 absolute ml-1 text-xs">(g)</i>
              </label>
              <input
                name="fat"
                data-set="macro"
                type="number"
                placeholder=""
                value={recipe.macros?.fat || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="addNutritionsContainer">
              <label className="recipeLabel" id="calories" htmlFor="calories">
                Calories:
              </label>
              <input
                name="calories"
                data-set="macro"
                type="number"
                placeholder={caloriesPlaceholder || undefined}
                value={recipe.macros?.calories || ""}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        <div className="recipeSpace"></div>
        {recipe.instructions &&
          recipe.instructions.map((ins, ins_index) => (
            <div className="addInstructionsContainer" key={ins_index}>
              <label
                className="recipeLabel tabular-nums"
                htmlFor={`instruction-${ins_index}`}
              >{`Instruction ${ins_index + 1}`}</label>
              <textarea
                placeholder=""
                rows={3}
                name="instruction"
                data-set="instruction"
                value={ins.instruction}
                onChange={(e) =>
                  handleInputChange(e, undefined, undefined, ins_index)
                }
              />
              <span
                onClick={(e) =>
                  handleInputDelete(e, undefined, undefined, ins_index)
                }
                data-set="instruction"
                className="crossIcon"
              ></span>
            </div>
          ))}
        <div className="addButtons">
          <button type="button" data-set="instruction"
            onClick={(e) => handleInputCreate(e)}>
            Add instruction
          </button>
        </div>

        <div className="h-5">
          {message && <div className="text-red-600">{message}</div>}
        </div>
        <button type="submit" disabled={loadingBtn}>
          Update
        </button>
        <button
          type="button"
          className="delete"
          onClick={async () => {
            const { handleDeleteRecipe } = await import("../services/editRecipeServices");
            await handleDeleteRecipe(recipe_id, public_id, router)
          }}>
          Delete
        </button>
      </form>
    </>
  );
}
