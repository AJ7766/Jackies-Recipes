import "./globals.css";
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "./_context/AuthContext";
const NavBar = dynamic(() => import("./_containers/NavBar"));
import { CookieConsent } from "./_containers/CookieConsent";
import { NavBarWidth } from "./_services/navBarServices";
import { customFonts } from "@/_utils/customFonts";
import { SelectedRecipeProvider } from "./_context/SelectedRecipeContext";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
      <AuthProvider>
        <body className={`${fontVariables}`}>
          <NavBar />
          <NavBarWidth>
            <SelectedRecipeProvider>
              {children}
              <SpeedInsights />
            </SelectedRecipeProvider>
          </NavBarWidth>
          <CookieConsent />
          <script src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ" async></script>
        </body>
      </AuthProvider>
    </html >
  );
}
