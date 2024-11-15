"use client";
import "./globals.css";
import { AuthProvider, useAuth } from "./_context/AuthContext";
import { ProfileProvider } from "./_context/ProfileContext";
import { useCookieConsent } from "@/_utils/cookies";
import { useEffect, useState } from "react";
import { CookieConsent } from "./_components/CookieConsent";
import NavBar from "./_components/NavBar";
import { usePathname  } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const { cookies, resetCookieConsent } = useCookieConsent();

  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);

    if (
      !document.querySelector(
        `script[src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ"]`
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ";
      script.async = true;

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());

        if (cookies.cookieConsent) {
          window.gtag("config", "G-W37LZK4XFJ", {
            page_path: window.location.pathname,
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.gtag && cookies.cookieConsent) {
      window.gtag("config", "G-W37LZK4XFJ", {
        page_path: window.location.pathname,
      });
    }
  }, [cookies.cookieConsent]);

  /* For testing
  useEffect(() => {
    resetCookieConsent();
  }, []); 
  */

  const NavBarGate = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    if (!isClient) return null;

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
          <ProfileProvider>
            <NavBarGate>
              <NavBar />
            </NavBarGate>
            {children}
            {isClient && cookies.cookieConsent == undefined && (
              <CookieConsent />
            )}
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
