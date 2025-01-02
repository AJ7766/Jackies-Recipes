"use client"
import { usePathname } from "next/navigation";
import { useAuth } from "../_context/AuthContext";
import { useIsResponsive } from "../_hooks/useIsResponsive";

export default function Body({children, fontVariables}: {children: React.ReactNode, fontVariables: string}) {
    const user = useAuth().user;
    const pathname = usePathname();
    const { isClient } = useIsResponsive();
    if(!isClient) return null;
    const overFlowStyle = !((pathname === "/" && user) || pathname === "/register") ? "scroll" : "hidden";
    return <body className={`${fontVariables} overflow-${overFlowStyle}`}><>{children}</></body>
}