import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProivder } from "./context/ProfileContext";

export const metadata: Metadata = {
  title: "Jackies Recipes",
  description: "Just for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <AuthProvider>
          <ProfileProivder>
            {children}
          </ProfileProivder>
        </AuthProvider>
      </body>
    </html>
  );
}
