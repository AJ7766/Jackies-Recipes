import "./globals.css";
import { AuthProvider } from "./_context/AuthContext";
import NavBar from "./_containers/NavBar";
import { CookieConsent } from "./_containers/CookieConsent";
import { getSession } from "@/_utils/session";
import { getUserController } from "./_ssr/user/userController";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const serverUser = (session.isAuth && session.user_id) && await getUserController(session.user_id);
  
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
        <AuthProvider serverUser={typeof serverUser === 'string' ? JSON.parse(serverUser) : serverUser}>
          <NavBar isAuth={session.isAuth} />
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
