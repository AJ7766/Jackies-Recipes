"use client"
import { useEffect, useState } from "react";
import NavBar from "./_components/NavBar";
import Categories from "../_components/Category";
import Masonary from "../_components/Masonary";
import { ProfileProps } from "../types/types";
import ProfilePage from "../_components/Profile";


export default function UserPage({params}: {params: {username:string}}) {

  const [userFound, setUserFound] = useState(true);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.username) {
    const fetchProfileData = async () => {
      console.log(params.username);
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
            setProfile(data);
            setUserFound(true);
        } catch (error:any) {
          console.error("Error fetching profile:", error.message);
          setUserFound(false);
        }finally{
          setIsLoading(false);
        }
        }
      fetchProfileData();
    }
  },[params.username]);

    if (loading) {
      return null;
    }

  return (
    <>
    {userFound ? 
      <>
      <NavBar />
      <ProfilePage username={profile?.username} fullName={profile?.fullName} />
      <Categories />
      <Masonary />
      </>:<>
      <NavBar />
      <div>User not found</div>
      </>
    }
  </>
  );
}
