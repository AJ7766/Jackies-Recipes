import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

const metropolis = localFont({
    src: [
        { path: "../../public/fonts/Metropolis-Medium.otf" },
    ],
    variable: "--font-metropolis",
    display: "swap",
});

const gotham = localFont({
    src: [
        { path: "../../public/fonts/Gotham-Book.otf", weight: "300" },
        { path: "../../public/fonts/Gotham-Medium.otf", weight: "500" },
        { path: "../../public/fonts/Gotham-Bold.otf", weight: "700" },
        { path: "../../public/fonts/Gotham-Black.otf", weight: "900" },
    ],
    variable: "--font-gotham",
    display: "swap",
});

const sourceSans = Source_Sans_3({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "600"],
    variable: "--font-source-sans",
});

export const customFonts = () => {
    return { metropolis, sourceSans, gotham };
};