import Link from "next/link";
import Image from "next/image";
import React, { RefObject } from "react";
import { CldImage } from "next-cloudinary";
import { activeLink, handleBlurInput, handleFocusInput } from "../_services/navBarServices";
import { UserProps } from "@/_types/UserTypes";
import { RecipeProps } from "@/_types/RecipeTypes";
const logo = "https://res.cloudinary.com/denumkkcx/image/upload/v1734112468/logo-text-free_c6hbgq.webp";
const searchGlass = "/images/icons/search.svg";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";
const home = "/images/icons/home.svg";
const addRecipe = "/images/icons/add-recipe.svg";
const settings = "/images/icons/settings.svg";

interface NavBarProps {
  user: UserProps | null;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  users: UserProps[];
  recipes: RecipeProps[];
  searchResultsRef: RefObject<HTMLDivElement>;
  dropdownRef: RefObject<HTMLDivElement>;
  dropdownIconRef: RefObject<HTMLDivElement>;
  dropdownItemsRef: RefObject<HTMLDivElement>;
  clickHandler: (navBarRef: RefObject<HTMLDivElement>) => void;
  isAuth: boolean;
  logout: () => void;
  navBarRef: RefObject<HTMLDivElement>;
  searchRef: RefObject<HTMLInputElement>;
  searchMobileIconRef: RefObject<HTMLDivElement>;
  pathname: string;
  isMobile: boolean;
  isClient: boolean;
}

export const NavBarComponent = React.memo(({
  user,
  search,
  setSearch,
  users,
  recipes,
  searchResultsRef,
  clickHandler,
  isAuth,
  dropdownRef,
  dropdownIconRef,
  dropdownItemsRef,
  logout,
  navBarRef,
  searchRef,
  searchMobileIconRef,
  pathname,
  isMobile,
  isClient
}: NavBarProps) => {
  return (
    <>
      <div className="navContainer" ref={navBarRef}>
        {(!isClient || (isClient && !isMobile)) &&
          <Link
            className="hidden md:block"
            href={"/"}
            prefetch={false}>
            <div className="navBarLogoComponent">
              <CldImage
                src={logo}
                alt="logo"
                width={40}
                height={40}
                fetchPriority="high"
                format="webp"
              />
              <h2>Jackies Recipes</h2>
            </div>
          </Link>
        }
        <Link
          className="navBarComponent"
          href={`/`}
          prefetch={false}
        >
          <Image
            className="home"
            height={30}
            width={30}
            src={home}
            alt="home-page"
          />
          {(!isClient || (isClient && !isMobile)) && <h2 className={`${activeLink(pathname, "/")} hidden md:block`}>Home</h2>}
        </Link>
        <div className="navBarComponent grid md:hidden" ref={searchMobileIconRef}>
          <Image
            src={searchGlass}
            id="searchGlass"
            alt="search-glass"
            width={30}
            height={30}
          />
        </div>
        {(!isClient || (isClient && !isMobile)) &&
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
          </div>
        }
        {isAuth && user ? (
          <>
            <Link
              className="navBarComponent"
              href={`/${user.username}`}
              prefetch={false}
            >
              <CldImage
                className="profilePicture"
                height={30}
                width={30}
                src={user.userContent?.profilePicture || profilePicture}
                alt="profile-picture"
                sizes='100px'
              />
              {(!isClient || (isClient && !isMobile)) && <h2 className={`${activeLink(pathname, `/${user.username}`)} hidden md:block`}>Profile</h2>}
            </Link>
            <Link className="navBarComponent" href="/add-recipe" prefetch={false}>
              <Image
                height={30}
                width={30}
                src={addRecipe}
                alt="add-recipe"
              />
              {(!isClient || (isClient && !isMobile)) && <h2 className={`${activeLink(pathname, `/add-recipe`)} hidden md:block`}>Add Recipe</h2>}
            </Link>

            <div className="dropdownContainer">
              <div className="navBarComponent cursor-pointer" ref={dropdownIconRef}>
                <Image
                  className="dropdownButton"
                  src={settings}
                  width={30}
                  height={30}
                  alt="drop-down-menu"
                  unoptimized
                />
                <h2 className="hidden md:block">More</h2>
              </div>
              <div className="dropdownContentContainer hidden" ref={dropdownRef}>
                <div className="dropdownContent" ref={dropdownItemsRef}>
                  <Link href="/settings">Settings</Link>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
            </div>
          </>
        ) :
          <div className="flex flex-row gap-[6px] md:flex-col">
            <Link href="/" prefetch={false}>
              <button className="bg-black p-[5px_clamp(7px,_2vw,_20px)] rounded-[5px] text-white w-[30vw] md:w-full">Login</button>
            </Link>
            <Link href="/register" prefetch={false}>
              <button className="bg-[#ef4444] p-[5px_clamp(7px,_2vw,_20px)] rounded-[5px] text-white w-[30vw] md:w-full">Register</button>
            </Link>
            {(!isClient || (isClient && !isMobile)) && <p className="hidden md:block">Make sure to login to get access to all features!<br /><br />This app is in development mode right now, feel free to login with recruiter:recruiter if you don't want to create an account</p>}
          </div>
        }
      </div >
    </>
  )
});
