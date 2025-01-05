import { RecipeProps } from "@/_types/RecipeTypes";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
const meals = "/images/icons/meal.svg";
const profilePicturePlaceholder = "/images/profile-picture.png";
const closeIcon = "/images/icons/close-recipe.svg";

interface SelectedRecipeComponentProps {
    recipe: RecipeProps | null;
    isMobile: boolean;
    isClient: boolean;
    handleCloseRecipe: () => void;
}

export default function SelectedRecipeComponent({
    recipe,
    isMobile,
    isClient,
    handleCloseRecipe
}: SelectedRecipeComponentProps) {
    return (
        recipe && (
            <>
                <div className="recipeContainer">
                    <div className="recipeLeftSideWrapper">
                        <div className="flex flex-row m-[4%]" >
                            <div className="flex flex-col">
                                <div className="recipeUserContainer">
                                    <Link
                                        className="flex gap-2"
                                        href={`/${recipe.user.username}`}
                                        onClick={() => {
                                            document.body.style.overflow = "auto";
                                        }}
                                    >
                                        <CldImage
                                            width={25}
                                            height={25}
                                            src={recipe.user.userContent?.profilePicture ||
                                                profilePicturePlaceholder
                                            }
                                            alt="profile-picture"
                                            format="webp"
                                        />
                                        <div>
                                            <h2>{recipe.user.username}</h2>
                                        </div>
                                    </Link>
                                </div>
                                <h1>{recipe?.title}</h1>
                            </div>
                            {(!isClient || (isClient && isMobile)) && recipe.image && (
                                <CldImage
                                    className="recipe-image"
                                    width={1280}
                                    height={850}
                                    src={recipe.image}
                                    alt="recipe-image"
                                    fetchPriority="high"
                                    format="webp"
                                />
                            )}
                        </div>
                        <div className="recipeIngredientsContainer">
                            {recipe?.macros && (
                                <div className="recipeMacroContainer">
                                    <div className="nutritionContainer">
                                        <div className="macroContainer">
                                            {Number(recipe?.macros?.carbs) > 0 && (
                                                <div className="macroInfo">
                                                    <p>Carbs</p>
                                                    <div className="carbsColor"></div>
                                                    <p>{recipe?.macros.carbs}g</p>
                                                </div>
                                            )}
                                            {Number(recipe?.macros?.protein) > 0 && (
                                                <div className="macroInfo">
                                                    <p>Protein</p>
                                                    <div className="proteinColor"></div>
                                                    <p>{recipe?.macros.protein}g</p>
                                                </div>
                                            )}
                                            {Number(recipe?.macros?.fat) > 0 && (
                                                <div className="macroInfo">
                                                    <p>Fat</p>
                                                    <div className="fatColor"></div>
                                                    <p>{recipe?.macros.fat}g</p>
                                                </div>
                                            )}
                                            {Number(recipe?.macros?.calories) > 0 && (
                                                <div className="macroInfo" id="macroInfoCalories">
                                                    <p>Calories</p>
                                                    <div className="caloriesColor"></div>
                                                    <p>{recipe.macros.calories}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {Number(recipe?.servings) > 0 && (
                                <div className="mealsContainer">
                                    <Image src={meals} width={24} height={24} alt="servings" />
                                    <p>{recipe?.servings}</p>
                                </div>
                            )}
                            {recipe.ingredients.map((ingList, ingListIndex) => (
                                <table key={ingListIndex}>
                                    <tbody>
                                        {ingList.component && (
                                            <tr>
                                                <td colSpan={2} className="recipeTitle">
                                                    {ingList.component}
                                                </td>
                                            </tr>
                                        )}

                                        {ingList.ingredients?.map((ing, ingIndex) => (
                                            <tr key={ingIndex}>
                                                <td className="amount">
                                                    {ing.amount} {ing.unit}
                                                </td>
                                                <td>{ing.ingredient}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </div>

                    <div className="recipeRightSideWrapper">
                        {(!isClient || (isClient && !isMobile)) && recipe.image && (
                            <CldImage
                                width={1280}
                                height={850}
                                src={recipe.image}
                                priority
                                alt="recipe-image"
                                format="webp"
                            />
                        )}
                        <div className="recipeInstructionsContainer">
                            <table>
                                <tbody>
                                    {recipe?.instructions?.map((ins, insIndex) => (
                                        <tr className="flex" key={insIndex}>
                                            <td id="instructionIndex">{insIndex + 1}.</td>
                                            <td>{ins.instruction}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="recipeBackground" onClick={handleCloseRecipe}>
                    <Image src={closeIcon} width={24} height={24} alt="close-recipe" />
                </div>
            </>
        )
    );
}