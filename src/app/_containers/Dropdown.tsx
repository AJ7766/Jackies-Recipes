"use client"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef } from "react";
import { useAuth } from "../_context/AuthContext";
import { handleDropdown } from "../_services/navBarServices";
const settings = "/images/icons/settings.svg";

export const Dropdown = () => {
    const { logout } = useAuth();
    const handleClickOutside = useCallback((e: MouseEvent) => {
        handleDropdown(e, dropdownIconRef, dropdownRef, dropdownItemsRef);
    }, []);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownIconRef = useRef<HTMLDivElement>(null);
    const dropdownItemsRef = useRef<HTMLDivElement>(null);
    return <>
        <div className="dropdownContainer">
            <div className="navBarComponent cursor-pointer" ref={dropdownIconRef}>
                <Image
                    className="dropdownButton"
                    src={settings}
                    width={30}
                    height={30}
                    alt="drop-down-menu"
                    unoptimized
                />
                <h2 className="hidden md:block">More</h2>
            </div>
            <div className="dropdownContentContainer hidden" ref={dropdownRef}>
                <div className="dropdownContent" ref={dropdownItemsRef}>
                    <Link href="/settings">Settings</Link>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </>
}