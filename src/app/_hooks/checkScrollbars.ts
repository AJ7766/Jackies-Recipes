import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useCheckScrollbars = (recipe: RecipePopulatedProps | null, toggleScrollbars: (disable: boolean) => void) => {
    const pathname = usePathname();
    useEffect(() => {
        if (recipe && recipe.user && recipe._id) {
            toggleScrollbars(pathname === `/${recipe.user.username}/${recipe._id}`);
        }
    }, [pathname]);
};