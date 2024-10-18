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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ"
        ></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W37LZK4XFJ', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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
