"use client"
import LoginForm from "./_components/LoginForm";
import { useEffect, useState } from "react";
import ProfilePage from "./_components/Profile";
import { ProfileProps } from "./types/types";
import NavBar from "./[username]/_components/NavBar";
import Masonary from "./_components/Masonary";
import Categories from "./_components/Category";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      
        if(token){
          try {
            const res = await fetch("/api/authentication", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            });
          if (!res.ok) {
            throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
          }
          const data = await res.json();
          setProfile(data);
          setIsLoggedIn(true);
        } catch (error:any) {
          console.error("Error fetching profile:", error.message);
          setIsLoggedIn(false);
        }finally{
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsLoading(false)
        return null;
      }
        }
      fetchProfileData();

    },[]);
    
    if (loading) {
      return null;
    }

  return (
    <>
    {!isLoggedIn ? 
      <LoginForm />
  : 
  <>
  <NavBar />
  <ProfilePage username={profile?.username} fullName={profile?.fullName} />
  <Categories />
  <Masonary />
  </>
  }
</> 
  );
}
