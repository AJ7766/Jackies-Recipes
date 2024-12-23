import { usePathname } from "next/navigation";
import { useAuth } from "../_context/AuthContext";

export const useIsAuthorizedProfile = () => {
    const { user } = useAuth();
    const pathname = usePathname();
    
    return user?.username === pathname.split("/")[1];
}