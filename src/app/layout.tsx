"use client";
import "./globals.css";
import { AuthProvider, useAuth } from "./_context/AuthContext";
import { useCookieConsent } from "@/_utils/cookies";
import { CookieConsent } from "./_components/CookieConsent";
import { usePathname } from "next/navigation";
import NavBar from "./_containers/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  /* For testing
  useEffect(() => {
    resetCookieConsent();
  }, []); 
  */

  const NavBarGate = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();

    if ((pathname === "/" && !isAuthenticated) || pathname === "/register")
      return null;

    return <>{children}</>;
  };

  return (
    <html lang="en">
      <head>
        <title>Jackies Recipes</title>
        <meta
          name="description"
          content="Social platform for sharing recipes"
        />
      </head>
      <body>
        <AuthProvider>
          <NavBarGate>
            <NavBar />
          </NavBarGate>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
