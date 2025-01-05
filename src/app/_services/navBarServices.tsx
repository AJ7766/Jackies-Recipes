"use client"
import { usePathname } from "next/navigation";
import { RefObject } from "react";
import { useAuth } from "../_context/AuthContext";
import { useIsResponsive } from "../_hooks/useIsResponsive";

export const checkNavBar = (pathname: string, isAuth: boolean) => {
    return !((pathname === "/" && !isAuth) || pathname === "/register");
}

export const checkOverflow = (isAuth: boolean) => {
    const pathname = usePathname();
    return !((pathname === "/" && !isAuth) || pathname === "/register");
}

export const NavBarWidth = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const { isClient } = useIsResponsive();
    const pathname = usePathname();
    if(!isClient) return null;
    
    if ((pathname === "/" && !user) || pathname === "/register")
        return <>{children}</>;

    return <div className="wrapper">{children}</div>
}

export const handleMobileSearch = (
    e: MouseEvent,
    searchMobileIconRef: RefObject<HTMLDivElement>,
    searchMobileRef: RefObject<HTMLDivElement>
) => {
    if (searchMobileIconRef.current && searchMobileIconRef.current.contains(e.target as Node)) {
        if (searchMobileRef.current) {
            searchMobileRef.current.classList.toggle("hidden");
        }
    }
    else if (searchMobileRef.current && !searchMobileRef.current.contains(e.target as Node))
        searchMobileRef.current.classList.add("hidden");
}

export const handleDropdown = (
    e: MouseEvent, dropdownIconRef: RefObject<HTMLDivElement>,
    dropdownRef: RefObject<HTMLDivElement>, dropdownItemsRef: RefObject<HTMLDivElement>
) => {
    if (dropdownIconRef.current && dropdownIconRef.current.contains(e.target as Node)) {
        if (dropdownRef.current) {
            dropdownRef.current.classList.toggle("hidden");
        }
    }
    else if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        dropdownRef.current.classList.add("hidden");
    }
    else if (dropdownItemsRef.current && dropdownItemsRef.current.contains(e.target as Node)) {
        setTimeout(() => {
            if (dropdownRef.current)
                dropdownRef.current.classList.add("hidden");
        }, 100);
    }
}

export const handleFocusInput = (navBarRef: RefObject<HTMLDivElement>) => {
    if (navBarRef.current) {
        navBarRef.current.style.width = "300px";
    }
};

export const handleBlurInput = (navBarRef: RefObject<HTMLDivElement>) => {
    if (navBarRef.current) {
        navBarRef.current.style.width = "250px";
    }
};

export const activeLink = (pathname: string, path: string) => {
    return pathname === path ? "active" : "";
};