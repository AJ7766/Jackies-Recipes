import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import { useState, useEffect } from "react";

export const ClientGuard = ({
  children,
  profile,
  fetchingProfile,
}: {
  children: JSX.Element;
  profile: UserPopulatedRecipePopulatedProps | null;
  fetchingProfile: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if(fetchingProfile)
    return <LoadingSpinner />

  if (!profile) return <div className="text-xl text-center">User not found</div>;

  return <>{children}</>;
};
