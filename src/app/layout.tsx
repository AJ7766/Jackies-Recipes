import "./globals.css";
import { AuthProvider } from "./_context/AuthContext";
import NavBar from "./_containers/NavBar";
import { CookieConsent } from "./_containers/CookieConsent";
import { getSession } from "@/_utils/session";
import { getUserController } from "./_ssr/user/userController";
import { cookies } from 'next/headers';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();
  const serverUser = await getUserController();

  const navCookie = cookies().get('nav')?.value;
  const showNav = navCookie === 'true';
  
  console.log('Nav cookie:', cookies().get('nav')?.value);
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
        <AuthProvider serverUser={serverUser}>
          <>
          {showNav && <NavBar isAuth={session.isAuth} />}
          {children}
          <CookieConsent />
          </>
        </AuthProvider>
      </body>
    </html>
  );
}
