import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useCheckScrollbars = (recipe: RecipePopulatedProps | null, setRecipe?: (recipe: RecipePopulatedProps | null) => void) => {
    const pathname = usePathname();
    useEffect(() => {
        if (recipe && recipe.user && recipe._id) {
            toggleScrollbars(pathname === `/${recipe.user.username}/${recipe._id}`);
        }
    }, [pathname]);

    const toggleScrollbars = (disable: boolean) => {
        if (disable) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            setRecipe && setRecipe(null)
        }

        if (window.innerWidth > 1024) {
            if (disable) {
                document.body.classList.add('pr-[7px]');
            } else {
                document.body.classList.remove('pr-[7px]');
            }
        }
    }
};