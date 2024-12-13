import Link from "next/link";
import Image from "next/image";
import { UserProps } from "@/_models/UserModel";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import React, { RefObject } from "react";
import { CldImage } from "next-cloudinary";
import { activeLink, handleBlurInput, handleFocusInput } from "../_services/navBarServices";
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
  recipes: RecipePopulatedProps[];
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
  isMobile
}: NavBarProps) => {
  return (
    <>
      <div className="navContainer" ref={navBarRef}>

        {!isMobile &&
          <Link
            className="hidden md:block"
            href={"/"}
            prefetch>
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
          prefetch
        >
          <Image
            className="home"
            height={30}
            width={30}
            src={home}
            alt="home-page"
          />
          {!isMobile && <h2 className={`${activeLink(pathname, "/")} hidden md:block`}>Home</h2>}
        </Link>
        {isMobile &&
          <div className="navBarComponent grid md:hidden" ref={searchMobileIconRef}>
            <Image
              src={searchGlass}
              id="searchGlass"
              alt="search-glass"
              width={30}
              height={30}
            />
          </div>
        }
        {!isMobile &&
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
        }
        {isAuth && user ? (
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
                sizes='100px'
              />
              {!isMobile && <h2 className={`${activeLink(pathname, `/${user.username}`)} hidden md:block`}>Profile</h2>}
            </Link>
            <Link className="navBarComponent" href="/add-recipe" prefetch>
              <Image
                height={30}
                width={30}
                src={addRecipe}
                alt="add-recipe"
              />
              {!isMobile && <h2 className={`${activeLink(pathname, `/add-recipe`)} hidden md:block`}>Add Recipe</h2>}
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
                  <Link href="/settings" prefetch>Settings</Link>
                  <Link href="/privacy-policy" prefetch>Privacy Policy</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              </div>
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
            {!isMobile && <p className="hidden md:block">Make sure to login to get access to all features!<br /><br />This app is in development mode right now, feel free to login with recruiter:recruiter if you don't want to create an account</p>}
          </div>
        }
      </div >
    </>
  )
});
