"use client"
import { usePathname } from "next/navigation";

export const checkNavBar = (pathname: string, isAuth: boolean) => {
    return !((pathname === "/" && !isAuth) || pathname === "/register");
}

export const NavBarWidth = ({ children, isAuth }: { children: React.ReactNode, isAuth: boolean }) => {
    const pathname = usePathname();
    if ((pathname === "/" && !isAuth) || pathname === "/register")
        return <>{children}</>;

    return <div className="wrapper">{children}</div>
}