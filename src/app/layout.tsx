import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yummy",
  description: "Generated by create next app",
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
      <div className="bgContainer">
        {children}
        </div>
        </body>
    </html>
  );
}
