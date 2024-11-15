"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/app/context/ProfileContext";
import { RecipePopulatedProps } from "@/models/RecipeModel";

const meals = "/images/meal.svg";
const profilePicturePlaceholder = "/images/profile-picture.png";
const closeIcon = "/images/close.svg";

export default function Recipe() {
  const [selectedRecipe, setSelectedRecipe] =
    useState<RecipePopulatedProps | null>(null);
  const closeRecipe = useRef<HTMLDivElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { profile } = useProfile();

  useEffect(() => {
    const pathParts = pathname.split("/");
    const recipeId = pathParts[pathParts.length - 1];

    if (profile?.recipes) {
      const foundRecipe = profile.recipes.find(
        (recipe) => recipe._id?.toString() === recipeId
      ) as RecipePopulatedProps | undefined;
      setSelectedRecipe(foundRecipe ?? null);
    }
  }, [pathname, profile]);

  useEffect(() => {
    toggleScrollbars(!!selectedRecipe);
  }, [selectedRecipe]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleScrollbars = (disable: boolean) => {
    document.body.style.overflow = disable ? "hidden" : "auto";

    if (window.innerWidth > 1024) {
      document.body.style.paddingRight = disable ? "7px" : "";
    }
  };

  const handleCloseRecipe = useCallback(() => {
    router.replace(`/${profile?.username}`, { scroll: false });
    setSelectedRecipe(null);
  }, [profile?.username, router]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        closeRecipe.current &&
        closeRecipe.current.contains(event.target as Node)
      ) {
        setSelectedRecipe(null);
        handleCloseRecipe();
      }
    },
    [handleCloseRecipe]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
