import Link from "next/link";
import Image from "next/image";
import { UserProps } from "@/_models/UserModel";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import React, { LegacyRef } from "react";
import { CldImage } from "next-cloudinary";
const logo = "/images/logo-text-free.png";
const searchGlass = "/images/search-glass.svg";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1733219780/profile-picture_vicljy.png";
const addRecipe = "/images/add.svg";
const dropdownIcon = "/images/arrow-down.png";

interface NavBarProps {
  user: UserProps | null;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  users: UserProps[];
  recipes: RecipePopulatedProps[];
  isOpen: boolean;
  searchResultsRef: LegacyRef<HTMLDivElement> | null;
  dropdownRef: LegacyRef<HTMLDivElement> | null;
  clickHandler: () => void;
  isAuth: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  logout: () => void;
}

export const NavBarComponent = React.memo(({
  user,
  search,
  setSearch,
  users,
  recipes,
  isOpen,
  searchResultsRef = null,
  dropdownRef = null,
  clickHandler,
  isAuth,
  toggleDropdown,
  closeDropdown,
  logout
}: NavBarProps) => {
  return (
    <>
      <div className="space"></div>
      <div className="navContainer">
        <Link
          href={"/"}
          prefetch>
          <Image
            id="logo"
            src={logo}
            alt="logo"
            width={24}
            height={28}
            className="w-full h-auto"
            priority
          />
        </Link>
        <div className="searchContainer">
          <Image
            src={searchGlass}
            id="searchGlass"
            alt="search-glass"
            width={24}
            height={24}
            className="w-full h-auto"
          />
          <input
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
              ref={searchResultsRef}
            >
              {users.length > 0 && (
                <>
                  <h1>Users</h1>
                  {users.map((user, index) => (
                    <Link
                      href={`/${user.username}`}
                      key={index}
                      onClick={clickHandler}
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
                      href={`/${recipe.user?.username}/${recipe._id}`}
                      key={index}
                      onClick={clickHandler}
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

        {isAuth && user ? (
          <>
            <Link className="addRecipe shrink-0" href="/add-recipe" prefetch>
              <Image
                height={32}
                width={32}
                src={addRecipe}
                alt="add-recipe"
              />
            </Link>
            <Link
              className="profilePictureLink shrink-0"
              href={`/${user.username}`}
              prefetch
            >
              <CldImage
                height={35}
                width={35}
                src={user.userContent?.profilePicture || profilePicture}
                alt="profile-picture"
              />
            </Link>
            <div className="dropdownContainer" ref={dropdownRef}>
              <Image
                className={`w-full h-auto dropdownButton ${isOpen ? "open" : ""}`}
                src={dropdownIcon}
                width={24}
                height={24}
                alt="drop-down-menu"
                onClick={toggleDropdown}
                unoptimized
              />
              {isOpen && (
                <div className="dropdownContentContainer">
                  <div className="dropdownContent">
                    <Link href="/settings " onClick={closeDropdown} prefetch>Settings</Link>
                    <Link href="/privacy-policy" onClick={closeDropdown} prefetch>Privacy Policy</Link>
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="newUserButtons">
            <Link href="/" prefetch>
              <button>Login</button>
            </Link>
            <Link href="/register" prefetch>
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
});
