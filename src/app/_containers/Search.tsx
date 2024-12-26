import Image from "next/image";
import { RefObject } from "react";
import Link from "next/link";
import { UserProps } from "@/_types/UserTypes";
import { RecipeProps } from "@/_types/RecipeTypes";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

export default function Search({
    searchMobileRef,
    search,
    setSearch,
    users,
    recipes,
    searchRef,
    clickHandler,
    navBarRef
}: {
    searchMobileRef: RefObject<HTMLDivElement>;
    clickHandler: (navBarRef: RefObject<HTMLDivElement>, searchMobileRef?: RefObject<HTMLDivElement>) => void;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    users: UserProps[];
    recipes: RecipeProps[];
    searchRef: RefObject<HTMLInputElement>;
    navBarRef: RefObject<HTMLDivElement>;
}) {
    return (
        <div className="mobile-search hidden" ref={searchMobileRef}>
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
                    className="searchedUsersContainer"
                    data-testid="searchedUsersContainer"
                >
                    {users.length > 0 && (
                        <>
                            <h1>Users</h1>
                            {users.map((user, index) => (
                                <Link
                                    href={`/${user.username}`}
                                    key={index}
                                    onClick={() => clickHandler(navBarRef, searchMobileRef)}
                                    prefetch>
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
                                    prefetch
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
        </div>
    );
}
