import Image from "next/image"
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useIsResponsive } from "../_hooks/useIsResponsive";
import { handleBlurInput, handleFocusInput } from "../_services/navBarServices";
import { UserProps } from "@/_types/UserTypes";
import { RecipeProps } from "@/_types/RecipeTypes";
import Link from "next/link";
import searchGlass from "../../../public/images/icons/search.svg";
import { useDebounce } from "../_hooks/useDebounce";
import { fetchGetSearchAPI } from "../_services/api/fetchGetSearchAPI";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

export const NavSearch = ({ navBarRef }: { navBarRef: RefObject<HTMLDivElement> }) => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<UserProps[]>([]);
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const { isMobile } = useIsResponsive();
    const searchRef = useRef<HTMLInputElement>(null);
    const searchResultsRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (
            searchResultsRef.current &&
            !searchResultsRef.current.contains(e.target as Node)) {
            setUsers([]);
            setRecipes([]);
            setSearch('');
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    const debouncedValue = useDebounce(search, 350);
    useEffect(() => {
        if (debouncedValue) {
            const fetchData = async () => {
                const { message, fetchedUsers, fetchedRecipes } = await fetchGetSearchAPI(search);

                if (!fetchedUsers || !fetchedRecipes)
                    throw new Error(message);

                setUsers(fetchedUsers);
                setRecipes(fetchedRecipes);
            };
            fetchData();
        } else {
            setUsers([]);
            setRecipes([]);
        }
    }, [debouncedValue]);

    const clickHandler = async (navBarRef: RefObject<HTMLDivElement>, searchMobileRef?: RefObject<HTMLDivElement>) => {
        if (!searchMobileRef) {
            handleBlurInput(navBarRef);
            setUsers([]);
            setRecipes([]);
            setSearch('');
            return;
        } else if (searchMobileRef.current)
            searchMobileRef.current.classList.add("hidden");
    }

    return (!isMobile &&
        <div className="searchContainer hidden md:grid">
            <Image
                src={searchGlass}
                id="searchGlass"
                alt="search-glass"
                width={30}
                height={30}
            />
            <input
                ref={searchRef}
                type="search"
                name="query"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                onClick={() => handleFocusInput(navBarRef)}
                onBlur={() => handleBlurInput(navBarRef)}
            />
            {(users.length > 0 || recipes.length > 0) && (
                <div
                    className="searchedUsersContainer"
                    data-testid="searchedUsersContainer"
                    ref={searchResultsRef}
                >
                    {users.length > 0 && (
                        <>
                            <h1>Users</h1>
                            {users.map((user, index) => (
                                <Link
                                    href={`/${user.username}`}
                                    key={index}
                                    onClick={() => clickHandler(navBarRef)}
                                    prefetch={false}>
                                    <div
                                        className="searchedUser"
                                        data-testid="searchedUser"
                                    >
                                        <Image
                                            height={42}
                                            width={42}
                                            src={user.userContent?.profilePicture || profilePicture}
                                            className="w-full h-auto"
                                            alt="user-picture"
                                        />
                                        <div>
                                            <h2>{user.username}</h2>
                                            <p>{user.fullName}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                    {recipes.length > 0 && (
                        <>
                            <h1>Recipes</h1>
                            {recipes.map((recipe, index) => (
                                <Link
                                    href={`/${recipe.user.username}/${recipe._id}`}
                                    key={index}
                                    onClick={() => clickHandler(navBarRef)}
                                    prefetch={false}
                                >
                                    <div
                                        className="searchedUser"
                                        data-testid="searchedRecipe"
                                        data-id={index}
                                        data-type="recipe"
                                    >
                                        <Image
                                            height={42}
                                            width={42}
                                            src={recipe.image}
                                            className="w-full h-auto"
                                            alt="recipe-image"
                                        />
                                        <div>
                                            <h2>{recipe.title}</h2>
                                            <p>{recipe.user.username}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>)
}