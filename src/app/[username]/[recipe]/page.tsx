"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "@/app/_components/NavBar";
import Categories from "@/app/_components/Category";
import { ProfilePropsOrNull } from "@/app/types/types";
import ProfilePage from "@/app/_components/Profile";
import ProfileErrorPage from "@/app/_components/ErrorPage";
import { usePathname, useRouter } from "next/navigation";
import Recipe from "@/app/_components/Recipe";
import Masonary from "@/app/_components/Masonary";
import { useAuth } from "@/app/context/AuthContext";

export default function UserPage({params}:{params: {username:string}}) {
  const { initializing } = useAuth();
  const [userFound, setUserFound] = useState(true);
  const [profile, setProfile] = useState<ProfilePropsOrNull>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const recipeRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

    useEffect(() => {
    const pathParts = pathname.split('/');
    const recipeId = pathParts[pathParts.length - 1];

    if (recipeId && recipeId !== params.username) {
        setSelectedRecipe(recipeId);
    } else {
        setSelectedRecipe(null);
    }
    }, [pathname, params.username]);

    const toggleScrollbars = (disable: boolean) => {
    document.body.style.overflow = disable ? 'hidden' : '';
    document.body.style.paddingRight = disable? '7px' : '';
    };

    useEffect(() => {
    toggleScrollbars(!!selectedRecipe);
    }, [selectedRecipe]);

    const handleCloseRecipe = useCallback(() => {
    router.replace(`/${profile?.username}`, { scroll: false });
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

    const handleRecipeClick = (recipeId: string) => {
        router.replace(`/${profile?.username}/${recipeId}`, { scroll: false });
        };

  useEffect(() => {
    if (initializing || !params.username) {
      return;
    }
    if (params.username) {
    const fetchProfileData = async () => {
          try {
            let res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({ username: params.username }),
                headers: {
                  "Content-Type": "application/json"
              },
            });
            console.log(`Response status: ${res.status}, Response status text: ${res.statusText}`);
          if (!res.ok) {
            const errorResponse = await res.json();
            console.log(errorResponse.message);
            setUserFound(false);
            throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
          }
            const data = await res.json();
            setProfile(data.profileData);
            console.log(data.profileData)
            setUserFound(true);
        } catch (error:any) {
          console.error("Error fetching profile:", error.message);
          setUserFound(false);
        }
        }
      fetchProfileData();
    }
  },[params.username,initializing]);

  if (initializing) {
    return null;
  }

  return (
    <>
    {userFound ? 
      <>
      {selectedRecipe && 
      <Recipe profile={profile} ref={recipeRef}/>
      }
      <NavBar />
      <ProfilePage profile={profile} />
      <Categories />
      <Masonary profile={profile}/>
      <button onClick={() => handleRecipeClick("123")}>TEST</button>
      </>:<>
      <NavBar />
      <ProfileErrorPage />
      </>
    }
  </>
  );
}
