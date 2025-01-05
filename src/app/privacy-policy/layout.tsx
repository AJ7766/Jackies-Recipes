import { NavBar } from "@/app/_components/NavBar/_NavBar";
import "../globals.css"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
        <div className="wrapper">
          {children}
        </div>
    </>
  );
}
