"use client";

import ProfilePage from "@/app/_components/Profile";
import NavBar from "../../_components/NavBar";
import Categories from "@/app/_components/Category";
import Masonary from "@/app/_components/Masonary";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { ProfileProps } from "@/app/types/types";
import Recipe from "@/app/_components/Recipe";

export default function RecipePage({params}: {params: {recipe:string; username?: string; }}) {
    const { initializing } = useAuth();
    const { username, recipe } = params;
    const [userFound, setUserFound] = useState(true);
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [loading, setIsLoading] = useState(true);



    useEffect(() => {
        if (initializing || !params.username) {
          return;
        }
        
        if (params.username) {
        const fetchProfileData = async () => {
          console.log("userPage running")
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
                setUserFound(false);
                throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
              }
                const data = await res.json();
                setProfile(data);
                setUserFound(true);
            } catch (error:any) {
              setUserFound(false);
            }finally{
              setIsLoading(false);
            }
            }
          fetchProfileData();
        }
      },[params.username,initializing]);

    return(
    <>
    <NavBar />
    <Recipe recipe={params.recipe}/>
    <ProfilePage username={profile?.username} fullName={profile?.fullName} />
    <Categories />
    <Masonary />
    </>
)
}