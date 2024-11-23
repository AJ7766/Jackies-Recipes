import "./globals.css";
import { AuthProvider } from "./_context/AuthContext";
import NavBar from "./_containers/NavBar";
import { CookieConsent } from "./_containers/CookieConsent";
import { getSession } from "@/_utils/session";
import { getUserController } from "./_ssr/user/userController";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();
  const serverUser = await getUserController();

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
          <NavBar isAuth={session.isAuth} />
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
