"use client"
import { usePathname } from "next/navigation";
import { RefObject } from "react";

export const checkOverflow = (isAuth: boolean) => {
    const pathname = usePathname();
    return !((pathname === "/" && !isAuth) || pathname === "/register");
}

export const handleMobileSearch = (e: MouseEvent) => {
    const searchMobileIcon = document.querySelector(".searchMobileIcon") as HTMLElement;
    const searchMobile = document.querySelector(".searchMobile") as HTMLElement;
    if (searchMobileIcon && searchMobileIcon.contains(e.target as Node)) {
        if (searchMobileIcon) {
            searchMobile.classList.toggle("hidden");
        }
    }
    else if (searchMobile && !searchMobile.contains(e.target as Node))
        searchMobile.classList.add("hidden");
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

export const handleFocusInput = () => {
    const navContainer = document.querySelector(".navContainer") as HTMLElement;
    if (navContainer) {
        navContainer.style.width = "300px";
    }
};

export const handleBlurInput = () => {
    const navContainer = document.querySelector(".navContainer") as HTMLElement;
    if (navContainer) {
        navContainer.style.width = "250px";
    }
};

export const activeLink = (path: string) => {
    const pathname = usePathname();
    return pathname === path ? "active" : "";
};