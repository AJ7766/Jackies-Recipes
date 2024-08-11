import Image from "next/image";
import meals from "@/app/images/test/meal.svg";
import profilePicturePlaceholder from "@/app/images/profile-picture.png";
import { ForwardedRef, forwardRef } from "react";
import { ProfilePropsOrNull } from "../types/types";
import Link from "next/link";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";

const Recipe = forwardRef<HTMLDivElement, { profile: ProfilePropsOrNull, recipe: SimplifiedRecipeProps }>(function Recipe({ profile, recipe }, ref: ForwardedRef<HTMLDivElement>) {

    return <>
        <div className="recipeContainer" ref={ref}>
        <div className="recipeLeftSideWrapper">
        <div className="recipeUserContainer">
        <Link className="flex gap-2" href={`/${profile?.username}`}>
        <Image width={25} height={25} src={profile?.userContent?.profilePicture || profilePicturePlaceholder} alt="profile-picture" />
        <div>
            <h2>{profile?.username}</h2>
        </div>
        </Link>
        </div>

        <h1>{recipe.title}</h1>
        <div className="recipeIngredientsContainer">
          {recipe.macros && 
                <div className="recipeMacroContainer">
            <div className="nutritionContainer">
                <div className="macroContainer">
            {recipe.macros.carbs && 
            <div className="macroInfo">
                <div className="carbsColor"></div>
                <p>Carbs: {recipe.macros.carbs}g</p>
            </div>
            }
            {recipe.macros.protein && 
            <div className="macroInfo">
                <div className="proteinColor"></div>
                <p>Protein: {recipe.macros.protein}g</p>
            </div>
            }
            {recipe.macros.fat && 
            <div className="macroInfo">
                <div className="fatColor"></div>
                <p>Fat: {recipe.macros.fat}g</p>
            </div>
            }
            {recipe.macros.calories && 
            <div className="macroInfo" id="macroInfoCalories">
                <div className="caloriesColor"></div>
                <p>Calories: {recipe.macros.calories}</p>
                </div>
            }
            </div>
            </div>
        </div>
        }
            {recipe.servings &&
            <div className="mealsContainer">
                  <Image src={meals} alt="servings"/>
                  <p>{recipe.servings}</p>
                  </div>
            }
            {recipe.ingredients.map((ingList, ingListIndex) => 
        <table key={ingListIndex}>
    <tbody>
    {ingList.component?.map((comp, compIndex) => 
    <tr key={compIndex}>
      <td colSpan={2} className="recipeTitle">{comp.component}</td>
    </tr>
    )}
    {ingList.ingredients?.map((ing, ingIndex) => 
    <tr key={ingIndex}>
      <td className="amount">{ing.amount} {ing.unit}</td>
      <td>{ing.ingredient}</td>
    </tr>
          )}
      </tbody>
      </table>
      )}
        </div>
        </div>
        <div className="recipeRightSideWrapper">
        {recipe.image &&
        <Image width={1280} height={850} src={recipe.image} alt="recipe-image"/>
        }
        
        <div className="recipeInstructionsContainer">
        <table>
    <tbody>
    {recipe.instructions?.map((ins, insIndex) => 
      <tr key={insIndex}>
        <td>{insIndex +1}</td>
        <td>{ins.instruction}</td>
      </tr>
    )}
    </tbody>
  </table>
        </div>
        </div>
        </div>
        <div className="recipeBackground"></div>
        </>
});

export default Recipe;