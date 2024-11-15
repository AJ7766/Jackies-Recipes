"use client";
import ProfilePage from "./_components/ProfileComponent";
import { useProfile } from "../_context/ProfileContext";
import { ClientGuard } from "./_services/profile";
import MasonaryProfile from "./_containers/MasonaryProfile";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { profile, fetchingProfile } = useProfile();
  return (
    <ClientGuard profile={profile || null} fetchingProfile={fetchingProfile}>
      <>
        {children}
        <ProfilePage profile={profile} />
        <MasonaryProfile profile={profile} />
      </>
    </ClientGuard>
  );
}
