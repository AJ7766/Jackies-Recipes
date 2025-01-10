"use client"
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserProps } from "@/_types/UserTypes";
import { RecipeProps } from "@/_types/RecipeTypes";
import { handleMobileSearch } from "../../../app/services/navBarServices";
import { useDebounce } from "../../../_hooks/useDebounce";
import { fetchGetSearchAPI } from "../../../server/api/fetchGetSearchAPI";
import { SearchCard } from "./SearchCard";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

export default function NavSearchMobile() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<UserProps[]>([]);
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    const searchResultsRef = useRef<HTMLDivElement | null>(null);
    const searchMobileRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        handleMobileSearch(e);
        if (
            !searchMobileRef.current?.contains(e.target as Node) &&
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

    const clickHandler = async () => {
        const searchMobile = document.querySelector(".searchMobile") as HTMLElement;
        if (!searchMobile) {
            setUsers([]);
            setRecipes([]);
            setSearch('');
            return;
        } else if (searchMobile)
            searchMobile.classList.add("hidden");
    }

    return (
        <div className="searchMobile hidden">
            <input
                ref={searchRef}
                type="search"
                name="query"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
            />
            {(users.length > 0 || recipes.length > 0) && (
                <div
                    className="search-container"
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
        </div>
    );
}
