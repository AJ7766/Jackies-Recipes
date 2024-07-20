"use client"
import { useEffect, useState } from "react";
import NavBar from "./_components/NavBar";
import Categories from "../_components/Category";
import Masonary from "../_components/Masonary";
import { ProfileProps } from "../types/types";
import { notFound } from "next/navigation";
import ProfilePage from "../_components/Profile";


export default function UserPage({params}: {params: {username:string}}) {

  const [userFound, setUserFound] = useState(false);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setIsLoading] = useState(true);
  const username = params.username;

  useEffect(() => {
    const fetchProfileData = async () => {
          try {
            let res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({username}),
                headers: {
                  "Content-Type": "application/json",
              },
            });
          if (!res.ok) {
            const errorResponse = await res.json();
            console.log(errorResponse);
            throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
          }else if(res.ok){
            const data = await res.json();
            console.log(data.user)
            setProfile(data.user);
            setUserFound(true);
          }

        } catch (error:any) {
          console.error("Error fetching profile:", error.message);
        }finally{
          setIsLoading(false);
        }
        }
      fetchProfileData();
    },[username]);

    if (loading) {
      return null;
    }

  return (
  <>
  <NavBar />
  <ProfilePage username={profile?.username} fullName={profile?.fullName} />
  <Categories />
  <Masonary />
  </>
  );
}
