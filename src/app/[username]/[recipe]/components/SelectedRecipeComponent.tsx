import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import Image from "next/image";
import Link from "next/link";

const meals = "/images/meal.svg";
const profilePicturePlaceholder = "/images/profile-picture.png";
const closeIcon = "/images/close.svg";

interface SelectedRecipeComponentProps {
    selectedRecipe: RecipePopulatedProps | null;
    isSmallScreen: boolean;
    profile: UserPopulatedRecipePopulatedProps | null;
    closeRecipe: React.RefObject<HTMLDivElement>;
}

export default function SelectedRecipeComponent({
    selectedRecipe,
    isSmallScreen,
    profile,
    closeRecipe
}: SelectedRecipeComponentProps) {
    return (
        selectedRecipe && (
            <>
                <div className="recipeContainer">
                    <div className="recipeLeftSideWrapper">
                        {isSmallScreen && selectedRecipe.image && (
                            <Image
                                width={1280}
                                height={850}
                                src={selectedRecipe.image}
                                priority
                                alt="recipe-image"
                            />
                        )}
                        <div className="recipeUserContainer">
                            <Link
                                className="flex gap-2"
                                href={`/${profile?.username}`}
                                onClick={() => {
                                    document.body.style.overflow = "auto";
                                }}
                            >
                                <Image
                                    width={25}
                                    height={25}
                                    src={
                                        profile?.userContent?.profilePicture ||
                                        profilePicturePlaceholder
                                    }
                                    alt="profile-picture"
                                />
                                <div>
                                    <h2>{profile?.username}</h2>
                                </div>
                            </Link>
                        </div>
                        <h1>{selectedRecipe?.title}</h1>
                        <div className="recipeIngredientsContainer">
                            {selectedRecipe?.macros && (
                                <div className="recipeMacroContainer">
                                    <div className="nutritionContainer">
                                        <div className="macroContainer">
                                            {Number(selectedRecipe?.macros?.carbs) > 0 && (
                                                <div className="macroInfo">
                                                    <p>Carbs</p>
                                                    <div className="carbsColor"></div>
                                                    <p>{selectedRecipe?.macros.carbs}g</p>
                                                </div>
                                            )}
                                            {Number(selectedRecipe?.macros?.protein) > 0 && (
                                                <div className="macroInfo">
                                                    <p>Protein</p>
                                                    <div className="proteinColor"></div>
                                                    <p>{selectedRecipe?.macros.protein}g</p>
                                                </div>
                                            )}
                                            {Number(selectedRecipe?.macros?.fat) > 0 && (
                                                <div className="macroInfo">
                                                    <p>Fat</p>
                                                    <div className="fatColor"></div>
                                                    <p>{selectedRecipe?.macros.fat}g</p>
                                                </div>
                                            )}
                                            {Number(selectedRecipe?.macros?.calories) > 0 && (
                                                <div className="macroInfo" id="macroInfoCalories">
                                                    <p>Calories</p>
                                                    <div className="caloriesColor"></div>
                                                    <p>{selectedRecipe.macros.calories}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {Number(selectedRecipe?.servings) > 0 && (
                                <div className="mealsContainer">
                                    <Image src={meals} width={24} height={24} alt="servings" />
                                    <p>{selectedRecipe?.servings}</p>
                                </div>
                            )}
                            {selectedRecipe.ingredients.map((ingList, ingListIndex) => (
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
                        {!isSmallScreen && selectedRecipe.image && (
                            <Image
                                width={1280}
                                height={850}
                                src={selectedRecipe.image}
                                priority
                                alt="recipe-image"
                            />
                        )}
                        <div className="recipeInstructionsContainer">
                            {isSmallScreen && <div className="dividerInstructions"></div>}
                            <div className="dividerInstructions"></div>

                            <table>
                                <tbody>
                                    {selectedRecipe?.instructions?.map((ins, insIndex) => (
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
                <div className="recipeBackground" ref={closeRecipe}>
                    <Image src={closeIcon} width={24} height={24} alt="close-recipe" />
                </div>
            </>
        )
    );
}