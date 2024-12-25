"use client"
import { usePathname } from "next/navigation";

export default function Body({children, fontVariables, isAuth}: {children: React.ReactNode, fontVariables: string, isAuth: boolean}) {
    const pathname = usePathname();
    const overFlowStyle = !((pathname === "/" && !isAuth) || pathname === "/register") ? "scroll" : "hidden";
    return <body className={`${fontVariables} overflow-${overFlowStyle}`}><>{children}</></body>
}