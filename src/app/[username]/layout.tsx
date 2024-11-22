import MasonaryProfile from "./_containers/MasonaryProfile";
import { ReactNode } from "react";
import Profile from "./_containers/Profile";
import { ProfileGuard } from "./_services/profileServices";

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <ProfileGuard >
      <>
        {children}
        <Profile />
        <MasonaryProfile />
      </>
    </ProfileGuard>
  );
}
