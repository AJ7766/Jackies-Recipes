import Link from "next/link";
import Image from "next/image";
import { UserProps } from "@/_models/UserModel";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import React, { LegacyRef, RefObject } from "react";
import { CldImage } from "next-cloudinary";
const logo = "/images/logo-text-free.png";
const searchGlass = "/images/search-glass.svg";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1733219780/profile-picture_vicljy.png";
const home = "/images/home.png";
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
  handleFocusInput: () => void;
  handleBlurInput: () => void;
  navBarRef: RefObject<HTMLDivElement>;
  searchRef: RefObject<HTMLInputElement>;
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
  logout,
  handleFocusInput,
  handleBlurInput,
  navBarRef,
  searchRef
}: NavBarProps) => {
  return (
    <>
      <div className="navContainer" ref={navBarRef}>
        <Link
          className="hidden md:block"
          href={"/"}
          prefetch>
          <div className="navBarLogoComponent">
            <Image
              src={logo}
              alt="logo"
              width={40}
              height={40}
              priority
            />
            <h2>Jackies Recipes</h2>
          </div>
        </Link>
        <Link
          className="navBarComponent "
          href={`/`}
          prefetch
        >
          <Image
            className="home"
            height={27}
            width={27}
            src={home}
            alt="home"
          />
          <h2 className="hidden md:block">Home</h2>
        </Link>

        <div className="navBarComponent grid md:hidden">
          <Image
            src={searchGlass}
            id="searchGlass"
            alt="search-glass"
            width={26}
            height={26}
          />
        </div>

        <div className="searchContainer hidden md:grid" onClick={handleFocusInput}>
          <Image
            src={searchGlass}
            id="searchGlass"
            alt="search-glass"
            width={26}
            height={26}
          />
          <input
            ref={searchRef}
            type="search"
            name="query"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            onBlur={handleBlurInput}
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

        {
          isAuth && user ? (
            <>
              <Link
                className="navBarComponent"
                href={`/${user.username}`}
                prefetch
              >
                <CldImage
                  className="profilePicture"
                  height={30}
                  width={30}
                  src={user.userContent?.profilePicture || profilePicture}
                  alt="profile-picture"
                />
                <h2 className="hidden md:block">Profile</h2>
              </Link>
              <Link className="navBarComponent" href="/add-recipe" prefetch>
                <Image
                  height={28}
                  width={28}
                  src={addRecipe}
                  alt="add-recipe"
                />
                <h2 className="hidden md:block">Add Recipe</h2>
              </Link>

              <div className="dropdownContainer" ref={dropdownRef}>
                <div className="navBarComponent more" onClick={toggleDropdown}>
                  <Image
                    className={`w-full h-auto dropdownButton ${isOpen ? "open" : ""}`}
                    src={dropdownIcon}
                    width={24}
                    height={24}
                    alt="drop-down-menu"
                    unoptimized
                  />
                  <h2 className="hidden md:block">More</h2>
                </div>
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
          ) :
            <div className="newUserButtons">
              <Link href="/" prefetch>
                <button className="bg-[#26323a]">Login</button>
              </Link>
              <Link href="/register" prefetch>
                <button className="bg-[#ef4444]">Register</button>
              </Link>
              <p className="hidden md:block">Make sure to login to get access to all features!<br/><br/>This app is in development mode right now, feel free to login with recruiter:recruiter if you don't want to create an account</p>
            </div>
        }
      </div >
    </>
  )
});
