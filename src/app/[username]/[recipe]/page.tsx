"use client"
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";
import { ProfileProps, ProfilePropsOrNull } from "@/app/types/types";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/authContext/AuthContext";

const meals = "/images/test/meal.svg";
const profilePicturePlaceholder = "/images/profile-picture.png";
const closeIcon = "/images/close.svg";

export default function Recipe() {
  const [selectedRecipe, setSelectedRecipe] = useState<SimplifiedRecipeProps | null>(null);
  const [profile, setProfile] = useState<ProfilePropsOrNull>(null);
  const closeRecipe = useRef<HTMLDivElement | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { initializing } = useAuth();

  const fetchSelectedRecipe = useCallback(async (profile:ProfileProps) => {
    const pathParts = pathname.split('/');
    const recipeId = pathParts[pathParts.length - 1];
    if (profile.recipes) {
      const foundRecipe = profile.recipes.find(recipe => recipe._id?.toString() === recipeId);
      if (foundRecipe) {
        setSelectedRecipe(foundRecipe);
        return;
      }
      setSelectedRecipe(null);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const username = pathname.split('/')[1];
      if (username){
      try {
        let res = await fetch("/api/profile", {
          method: "POST",
          body: JSON.stringify({ username }),
          headers: {
            "Content-Type": "application/json"
          },
        });
        if (!res.ok) {
          const errorResponse = await res.json();
          console.log(errorResponse.message);
          throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
        }
        const data = await res.json();
        setProfile(data.profileData);
        fetchSelectedRecipe(data.profileData);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      }finally{
        setFetching(false);
      }
    }
    };
    fetchProfileData();
  }, [pathname, fetchSelectedRecipe]);

  useEffect(() => {
    toggleScrollbars(!!selectedRecipe);
}, [selectedRecipe]);

useEffect(() => {
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1024);
  };
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  return () => {
    window.removeEventListener('resize', checkScreenSize);
  };
}, []);

  const toggleScrollbars = (disable: boolean) => {
    document.body.style.overflow = disable ? 'hidden' : '';
    
    if(window.innerWidth > 1024){
      document.body.style.paddingRight = disable? '7px' : '';
    }
    };

  const handleCloseRecipe = useCallback(() => {
    router.replace(`/${profile?.username}`, { scroll: false });
    setSelectedRecipe(null);
  }, [profile?.username, router]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (closeRecipe.current && closeRecipe.current.contains(event.target as Node)) {
      setSelectedRecipe(null);
      handleCloseRecipe();
    }
  }, [handleCloseRecipe]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (initializing || fetching) {
    return null;
  }

  if(!selectedRecipe){
    return null;
  }
  if (!selectedRecipe?.macros?.calories) {
    console.log(selectedRecipe?.macros?.calories);
  }
  return (
    <>
    <div className="recipeContainer">
      <div className="recipeLeftSideWrapper">
      {isSmallScreen && selectedRecipe.image &&
        <Image width={1280} height={850} src={selectedRecipe.image}  priority alt="recipe-image"/>
        }
        <div className="recipeUserContainer">
          <Link className="flex gap-2" href={`/${profile?.username}`}>
            <Image
              width={25}
              height={25}
              src={profile?.userContent?.profilePicture || profilePicturePlaceholder}
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
                    {Number(selectedRecipe?.macros?.fat) > 0 && (
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
          {selectedRecipe?.ingredients.map((ingList, ingListIndex) => (
            <table key={ingListIndex}>
              <tbody>
                {ingList.component?.map((comp, compIndex) => (
                  <tr key={compIndex}>
                    <td colSpan={2} className="recipeTitle">
                      {comp.component}
                    </td>
                  </tr>
                ))}
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
        {!isSmallScreen && selectedRecipe.image &&
        <Image width={1280} height={850} src={selectedRecipe.image}  priority alt="recipe-image"/>
        }
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
  );
}