import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { customFonts } from "@/_utils/customFonts";
import { CookiesConsent } from "@/components/CookiesConsent";

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
        <body className={`${fontVariables}`}>
            {children}
            <SpeedInsights />
            <CookiesConsent />
          <script src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ" async></script>
        </body>
    </html >
  );
}
