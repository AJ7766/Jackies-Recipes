import { useLayoutEffect, useState } from "react";

export const useIsResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
        const checkResponsive = () => {
            setIsMobile(window.innerWidth <= 768)
            setIsTablet(window.innerWidth <= 1024)
        };
        checkResponsive();

        window.addEventListener("resize", checkResponsive);
        return () => window.removeEventListener("resize", checkResponsive);
    }, []);

    return { isMobile, isTablet, isClient };
};