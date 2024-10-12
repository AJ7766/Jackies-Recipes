import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import NavBar from "./_components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Jackies Recipes</title>
        <meta name="description" content="Just for fun" />
      </head>
      <body>
        <AuthProvider>
          <ProfileProvider>
            <NavBar />
            {children}
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
