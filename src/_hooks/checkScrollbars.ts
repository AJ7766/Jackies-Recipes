import { RecipeProps } from "@/_types/RecipeTypes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useCheckScrollbars = (recipe: RecipeProps | null, toggleScrollbars: (disable: boolean) => void) => {
    const pathname = usePathname();
    useEffect(() => {
        if (recipe && recipe.user && recipe._id) {
            toggleScrollbars(pathname === `/${recipe.user.username}/${recipe._id}`);
        }
    }, [pathname, recipe]);
};