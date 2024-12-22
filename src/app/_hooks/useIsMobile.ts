import { useLayoutEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
        const checkIfMobile = () => setIsMobile(window.innerWidth <= breakpoint);
        checkIfMobile();

        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, [breakpoint]);

    return {isMobile, isClient};
};