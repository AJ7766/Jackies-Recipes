import MasonryProfile from "./_containers/MasonryProfile";
import { ReactNode } from "react";
import Profile from "./_containers/Profile";
import { getProfileController } from "./_ssr/profileController";
import { ProfileProvider } from "../_context/ProfileContext";

export default async function RootLayout({ children, params }: { children: ReactNode, params: Promise<{ username: string }> }) {
  const { username } = await params;
  const { serverProfile } = await getProfileController(username.toLocaleLowerCase());

  if (!serverProfile)
    return (
      <div className="errorContainer">
        <h1>
          User not found.
        </h1>
      </div>
    )

  return (
    <>
      <ProfileProvider serverProfile={serverProfile}>
        {children}
        <Profile />
        <MasonryProfile />
      </ProfileProvider>
    </>
  );
}
