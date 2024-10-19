"use client";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import NavBar from "./_components/NavBar";
import { useCookieConsent } from "@/config/cookies";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CookieConsent } from "./_components/CookieConsent";
import { usePathname } from "next/navigation";

const RefContext = createContext<React.RefObject<HTMLDivElement> | undefined>(
  undefined
);

export function useRefContext() {
  const context = useContext(RefContext);
  if (!context) {
    throw new Error("useRefContext must be used within a RefProvider");
  }
  return context;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const [loginPage, setLoginPage] = useState(false);

  const { cookies, resetCookieConsent } = useCookieConsent();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
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
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;

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
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (ref.current) {
      console.log(ref, ref.current);
      setLoginPage(true);
    } else {
      setLoginPage(false);
    }
    console.log(pathname);
  }, [isClient, ref, pathname]);

  useEffect(() => {
    resetCookieConsent();
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Jackies Recipes</title>
        <meta
          name="description"
          content="Social food recipe sharing platform"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ"
        ></script>
      </head>
      <body>
        <AuthProvider>
          <ProfileProvider>
            <RefContext.Provider value={ref}>
              {!loginPage && <NavBar />}
              {children}
              {isClient && cookies.cookieConsent == undefined && (
                <CookieConsent />
              )}
            </RefContext.Provider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
