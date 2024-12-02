"use client"
import { createContext, useContext, useEffect } from "react";


interface CacheContextType {
    clearCache: () => void;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

const clearCache = () => {
    console.log("manually clearing cache");
    sessionStorage.clear();
};

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
    return <CacheContext.Provider value={{ clearCache }}>
        {children}
    </CacheContext.Provider>
}

export const useCache = () => {
    const context = useContext(CacheContext);
    if (!context) {
      throw new Error("useCache must be used within a CacheProvider");
    }
    return context;
  };