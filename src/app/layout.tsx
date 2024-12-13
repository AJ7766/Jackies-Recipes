import "./globals.css";
import dynamic from 'next/dynamic';
import { AuthProvider } from "./_context/AuthContext";
const NavBar = dynamic(() => import("./_containers/NavBar"));
import { CookieConsent } from "./_containers/CookieConsent";
import { getSession } from "@/_utils/session";
import { getUserController } from "./_ssr/user/userController";
import { CacheProvider } from "./_context/CacheContext";
import { NavBarWidth } from "./_services/navBarServices";
import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

const metropolis = localFont({
  src: [
    {
      path: "/fonts/Metropolis-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-metropolis",
  display: "swap",
});


const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-source-sans",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const serverUser = (session.isAuth && session.user_id) && await getUserController(session.user_id);
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Social platform for sharing recipes"
        />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className={sourceSans.className}>
        <AuthProvider serverUser={typeof serverUser === 'string' ? JSON.parse(serverUser) : serverUser}>
          <CacheProvider>
            <NavBar isAuth={session.isAuth} />
            <NavBarWidth isAuth={session.isAuth}>
              {children}
            </NavBarWidth>
            <CookieConsent />
          </CacheProvider>
        </AuthProvider>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ" async></script>
      </body>
    </html >
  );
}
