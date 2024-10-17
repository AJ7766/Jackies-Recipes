"use client";
import ProfilePage from "./_components/Profile";
import { useProfile } from "../context/ProfileContext";
import Masonary from "./_components/Masonary";
import { LoadingSpinner } from "../_components/LoadingSpinner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, loading } = useProfile();
  return (
    <>
      {loading ? <LoadingSpinner /> :
        (profile ? (
          <>
            {children}
            <ProfilePage profile={profile || null} />
            <div className="divider"></div>
            <Masonary profile={profile} />
          </>
        ) : (
          <div className="text-xl text-center">User not found</div>
        ))}
    </>
  );
}
