import { SpeedInsights } from "@vercel/speed-insights/next"
import { SelectedRecipeProvider } from "../../_context/SelectedRecipeContext";
import { NavBar } from "@/components/NavBar/NavBar";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
        <div className="wrapper">
          {children}
        </div>
        <SpeedInsights />
    </>
  );
}
