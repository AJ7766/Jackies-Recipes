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
  const { profile, userFound, loading } = useProfile();
  return (
    <>
      <NavBar />
      {!loading &&
        (userFound ? (
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
