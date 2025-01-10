"use client"
import Image from "next/image"
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { UserProps } from "@/_types/UserTypes";
import { RecipeProps } from "@/_types/RecipeTypes";
import { useIsResponsive } from "@/app/_hooks/useIsResponsive";
import { useDebounce } from "@/app/_hooks/useDebounce";
import { handleBlurInput, handleFocusInput } from "@/app/_services/navBarServices";
import { fetchGetSearchAPI } from "@/server/api/fetchGetSearchAPI";
import searchGlass from "../../../../public/images/icons/search.svg"
import Link from "next/link";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

interface SearchCardProps {
    type: "user" | "recipe";
    image: string;
    title: string;
    subtitle: string;
    href: string;
    onClick: () => void;
}


export const NavSearch = () => {
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

    const clickHandler = async (searchMobileRef?: RefObject<HTMLDivElement>) => {
        if (!searchMobileRef) {
            handleBlurInput();
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
                onClick={handleFocusInput}
                onBlur={() => handleBlurInput()}
            />
            {(users.length > 0 || recipes.length > 0) && (
                <div
                    className="search-container"
                    ref={searchResultsRef}
                >
                    {users.length > 0 && (
                        <>
                            <h1>Users</h1>
                            {users.map((user, index) => (
                                <SearchCard
                                    key={index}
                                    type="user"
                                    image={user.userContent?.profilePicture || profilePicture}
                                    title={user.username}
                                    subtitle={user.fullName}
                                    href={`/${user.username}`}
                                    onClick={clickHandler}
                                />
                            ))}
                        </>
                    )}

                    {recipes.length > 0 && (
                        <>
                            <h1>Recipes</h1>
                            {recipes.map((recipe, index) => (
                                <SearchCard
                                    key={index}
                                    type="recipe"
                                    image={recipe.image}
                                    title={recipe.title}
                                    subtitle={recipe.user.username}
                                    href={`/${recipe.user.username}/${recipe._id}`}
                                    onClick={clickHandler}
                                />
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>)
}

const SearchCard = ({ type, image, title, subtitle, href, onClick }: SearchCardProps) => {
    return (
        <Link href={href} onClick={onClick} prefetch={false}>
            <div className={`search-card`}>
                <Image
                    height={42}
                    width={42}
                    src={image}
                    className="w-full h-auto"
                    alt={`${type}-image`}
                />
                <div>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </div>
        </Link>
    )
}