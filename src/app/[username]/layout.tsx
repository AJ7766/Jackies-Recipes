"use client";
import ProfilePage from "./_components/Profile";
import { useProfile } from "../context/ProfileContext";
import Masonary from "./_components/Masonary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, loading } = useProfile();
  return (
    <>
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
}
