"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "../_components/NavBar";
import Masonary from "../_components/Masonary";
import { ProfilePropsOrNull } from "../types/types";
import ProfilePage from "../_components/Profile";
import UserErrorPage from "../_components/UserError";
import { usePathname, useRouter } from "next/navigation";
import Recipe from "../_components/Recipe";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";


export default function UserPage({params}: {params: {username:string}}) {
  const [userFound, setUserFound] = useState(true);
  const [profile, setProfile] = useState<ProfilePropsOrNull>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<SimplifiedRecipeProps | null>(null);
  const recipeRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSelectedRecipe = async () => {
      const pathParts = pathname.split('/');
      const recipeId = pathParts[pathParts.length - 1];

      if (profile?.recipes) {
        const foundRecipe = profile.recipes.find(recipe => recipe._id?.toString() === recipeId);
        if (foundRecipe) {
          setSelectedRecipe(foundRecipe);
          return;
        }
        return setSelectedRecipe(null);
      }
    };
    fetchSelectedRecipe();
  }, [pathname, profile?.recipes]);

    const toggleScrollbars = (disable: boolean) => {
    document.body.style.overflow = disable ? 'hidden' : '';
    document.body.style.paddingRight = disable? '7px' : '';
    };

    useEffect(() => {
        toggleScrollbars(!!selectedRecipe);
    }, [selectedRecipe]);

    const handleCloseRecipe = useCallback(() => {
    router.replace(`/${profile?.username}`, { scroll: false });
    setSelectedRecipe(null);
    },[profile?.username, router]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
    if (recipeRef.current && !recipeRef.current.contains(event.target as Node)) {
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

  useEffect(() => {
    if (!params.username) {
      return;
    }else {
    const fetchProfileData = async () => {
          try {
            let res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({ username: params.username }),
                headers: {
                  "Content-Type": "application/json"
              },
            });
          if (!res.ok) {
            const errorResponse = await res.json();
            console.log(errorResponse.message);
            setUserFound(false);
            throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
          }
            const data = await res.json();
            setProfile(data.profileData);
            setUserFound(true);
        } catch (error:any) {
          console.error("Error fetching profile:", error.message);
          setUserFound(false);
        }finally{
          setLoading(false);
        }
        }
      fetchProfileData();
    }
  },[params.username]);

  return (
    <>
    {userFound ? 
      <>
      {selectedRecipe && 
      <Recipe profile={profile} recipe={selectedRecipe} ref={recipeRef}/>
      }
      <NavBar />
      <ProfilePage profile={profile} />
      <div className="divider"></div>
      <Masonary profile={profile} loading={loading}/>
      </>:<>
      <NavBar />
      <UserErrorPage />
      </>
    }
  </>
  );
}
