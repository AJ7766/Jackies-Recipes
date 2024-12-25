import "./globals.css";
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "./_context/AuthContext";
const NavBar = dynamic(() => import("./_containers/NavBar"));
import { CookieConsent } from "./_containers/CookieConsent";
import { getSession } from "@/_utils/session";
import { getUserController } from "./_ssr/user/userController";
import { CacheProvider } from "./_context/CacheContext";
import { NavBarWidth } from "./_services/navBarServices";
import { customFonts } from "@/_utils/customFonts";
import { SelectedRecipeProvider } from "./_context/SelectedRecipeContext";
import Body from "./_components/bodyComponent";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const serverUser = (session.token && session.user_id) && await getUserController(session.user_id);
  const { metropolis, sourceSans, gotham } = customFonts();
  const fontVariables = `${metropolis.variable} ${sourceSans.variable} ${gotham.variable}`;
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
      </head>
      <Body fontVariables={fontVariables} isAuth={!!session.token}>
        <AuthProvider serverUser={typeof serverUser === 'string' ? JSON.parse(serverUser) : serverUser}>
          <CacheProvider>
            <NavBar isAuth={!!session.token} />
            <NavBarWidth isAuth={!!session.token}>
              <SelectedRecipeProvider>
                {children}
                <SpeedInsights />
              </SelectedRecipeProvider>
            </NavBarWidth>
            <CookieConsent />
          </CacheProvider>
        </AuthProvider>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ" async></script>
      </Body>
    </html >
  );
}
