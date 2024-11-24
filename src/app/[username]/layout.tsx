import MasonaryProfile from "./_containers/MasonaryProfile";
import { ReactNode } from "react";
import Profile from "./_containers/Profile";
import { getProfileController } from "./_ssr/profile/profileController";
import { ProfileProvider } from "../_context/ProfileContext";
import ErrorPage from "../_errors/ErrorPage";

export const revalidate = 0;

export default async function RootLayout({ children, params }: { children: ReactNode, params: { username: string } }) {
  const { username } = params;
  const { serverProfile } = await getProfileController(username.toLocaleLowerCase());

  if (!serverProfile)
    return <ErrorPage />

  return (
    <>
      <ProfileProvider serverProfile={serverProfile}>
        {children}
        <Profile />
        <MasonaryProfile />
      </ProfileProvider>
    </>
  );
}
