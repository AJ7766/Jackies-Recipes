import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./authContext/AuthContext";

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
      <head>
      </head>
      <body>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
