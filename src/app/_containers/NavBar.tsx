"use client"
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { fetchGetSearchAPI } from "../_services/api/fetchGetSearchAPI";
import { usePathname } from "next/navigation";
import { activeLink, checkNavBar, handleBlurInput, handleDropdown, handleFocusInput, handleMobileSearch } from "../_services/navBarServices";
import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import("../_components/SearchComponent"), { ssr: false });
import { useDebounce } from "../_hooks/useDebounce";
import { useIsResponsive } from "../_hooks/useIsResponsive";
import { UserProps } from "@/_types/UserTypes";
import { RecipeProps } from "@/_types/RecipeTypes";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { NavSearch } from "./NavSearch";
const logo = "https://res.cloudinary.com/denumkkcx/image/upload/v1734112468/logo-text-free_c6hbgq.webp";
const searchGlass = "/images/icons/search.svg";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";
const home = "/images/icons/home.svg";
const addRecipe = "/images/icons/add-recipe.svg";
const settings = "/images/icons/settings.svg";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownIconRef = useRef<HTMLDivElement>(null);
  const dropdownItemsRef = useRef<HTMLDivElement>(null);
  const searchMobileRef = useRef<HTMLDivElement>(null);
  const searchMobileIconRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isMobile } = useIsResponsive();
  const handleClickOutside = useCallback((e: MouseEvent) => {
    handleMobileSearch(e, searchMobileIconRef, searchMobileRef);
    handleDropdown(e, dropdownIconRef, dropdownRef, dropdownItemsRef);
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

  if (!checkNavBar(pathname, !!user))
    return null;

  return <>
    <SearchComponent
      searchMobileRef={searchMobileRef}
      search={search}
      setSearch={setSearch}
      users={users}
      recipes={recipes}
      searchRef={searchRef}
      navBarRef={navBarRef}
      clickHandler={clickHandler}
    />
    <>
      <div className="navContainer" ref={navBarRef}>
        {!isMobile &&
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
          {!isMobile && <h2 className={`${activeLink(pathname, "/")} hidden md:block`}>Home</h2>}
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
        <NavSearch navBarRef={navBarRef} />
        {user ? (
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
              {!isMobile && <h2 className={`${activeLink(pathname, `/${user.username}`)} hidden md:block`}>Profile</h2>}
            </Link>
            <Link className="navBarComponent" href="/add-recipe" prefetch={false}>
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
            {!isMobile && <p className="hidden md:block">Make sure to login to get access to all features!<br /><br />This app is in development mode right now, feel free to login with recruiter:recruiter if you don't want to create an account</p>}
          </div>
        }
      </div >
    </>
  </>
}
