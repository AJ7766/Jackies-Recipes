"use client";
import { useEffect, useState } from "react";
import NavBar from "../_components/NavBar";
import { useParams } from "next/navigation";
import { ProfilePropsOrNull } from "../types/types";
import ProfilePage from "../_components/Profile";
import Masonary from "../_components/Masonary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userFound, setUserFound] = useState(true);
  const [profile, setProfile] = useState<ProfilePropsOrNull>(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const lowercaseUsername = Array.isArray(username)
    ? username[0].toLowerCase()
    : username?.toLowerCase() ?? "";

  useEffect(() => {
    if (lowercaseUsername) {
      const fetchProfileData = async () => {
        try {
          let res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify({ username: lowercaseUsername }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            setUserFound(false);
            throw new Error(
              `Failed to fetch profile: ${res.status} - ${res.statusText}`
            );
          }
          const data = await res.json();
          setProfile(data.profileData);
          setUserFound(true);
        } catch (error: any) {
          console.error("Error fetching profile:", error.message);
          setUserFound(false);
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
  }, [username]);

  return (
    <>
      <NavBar />
      {children}
      {userFound && !loading && (
        <>
          <ProfilePage profile={profile} />
          <div className="divider"></div>
          <Masonary profile={profile} />
        </>
      )} 
    </>
  );
}
