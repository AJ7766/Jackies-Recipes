"use client"
import { createContext, useEffect } from "react";

const CacheContext = createContext({});

export function CacheProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log("clearing cache");
            sessionStorage.clear()
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    return <CacheContext.Provider value={{}}>
        {children}
    </CacheContext.Provider>
}
