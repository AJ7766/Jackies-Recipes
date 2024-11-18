import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { useState, useEffect } from "react";
import { useProfile } from "@/app/_context/ProfileContext";

export const ProfileGuard = ({ children }: { children: JSX.Element }) => {
  const { profile, fetchingProfile } = useProfile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (fetchingProfile)
    return <LoadingSpinner />

  if (!profile) return <div className="text-xl text-center">User not found</div>;

  return <>{children}</>;
};
