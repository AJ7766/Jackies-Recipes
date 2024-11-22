<<<<<<< Updated upstream
"use client";
import NavBar from "../_components/NavBar";
import ProfilePage from "../_components/Profile";
import Masonary from "../_components/Masonary";
import { useProfile } from "../context/ProfileContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, loading } = useProfile();
  return (
    <>
      <NavBar />
      {!loading &&
        (profile ? (
          <>
            {children}
            <ProfilePage profile={profile} />
            <div className="divider"></div>
            <Masonary profile={profile} />
          </>
        ) : (
          <div className="text-xl text-center">User not found</div>
        ))}
    </>
  );
=======
import MasonaryProfile from "./_containers/MasonaryProfile";
import { ReactNode } from "react";
import Profile from "./_containers/Profile";
import { getUserPopulatedService } from "../api/profile/services/profileServices";

export default async function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const lowercaseUsername = username.toLocaleLowerCase();
    const serverProfile = await getUserPopulatedService(lowercaseUsername);
    const populatedProfile = JSON.parse(JSON.stringify(serverProfile));

    return (
            <>
                {children}
                <Profile serverProfile={populatedProfile} />
                <MasonaryProfile serverProfile={populatedProfile} />
            </>
    );
>>>>>>> Stashed changes
}
