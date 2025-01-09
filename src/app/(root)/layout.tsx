import "../globals.css";
import dynamic from 'next/dynamic';
import { SpeedInsights } from "@vercel/speed-insights/next"
const NavBar = dynamic(() => import("../../components/NavBar/NavBar").then((mod) => mod.NavBar), { ssr: true });
import { SelectedRecipeProvider } from "../_context/SelectedRecipeContext";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <SelectedRecipeProvider>
        <div className="wrapper">
          {children}
        </div>
        <SpeedInsights />
      </SelectedRecipeProvider>
    </>
  );
}
