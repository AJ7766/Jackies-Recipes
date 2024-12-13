import { useLayoutEffect, useState } from "react";

export const useMobileCheck = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth <= breakpoint);
        checkIfMobile();

        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, [breakpoint]);

    return isMobile;
};