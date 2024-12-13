"use client"
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { UserProps } from "@/_models/UserModel";
import { fetchGetSearchAPI } from "../_services/api/fetchGetSearchAPI";
import { NavBarComponent } from "../_components/NavBarComponent";
import { usePathname } from "next/navigation";
import { checkNavBar, handleBlurInput, handleDropdown, handleMobileSearch } from "../_services/navBarServices";
import Search from "./Search";
import { useMobileCheck } from "../_hooks/isMobile";

export default function NavBar({ isAuth }: { isAuth: boolean }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);
  const [recipes, setRecipes] = useState<RecipePopulatedProps[]>([]);
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

  const isMobile = useMobileCheck();

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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
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
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  if (!checkNavBar(pathname, isAuth))
    return null;

  return <>
    <Search
      searchMobileRef={searchMobileRef}
      search={search}
      setSearch={setSearch}
      users={users}
      recipes={recipes}
      searchRef={searchRef}
      navBarRef={navBarRef}
      clickHandler={clickHandler}
    />
    <NavBarComponent
      user={user}
      isAuth={isAuth}
      search={search}
      setSearch={setSearch}
      users={users}
      recipes={recipes}
      searchResultsRef={searchResultsRef}
      dropdownRef={dropdownRef}
      dropdownIconRef={dropdownIconRef}
      dropdownItemsRef={dropdownItemsRef}
      clickHandler={clickHandler}
      logout={logout}
      navBarRef={navBarRef}
      searchRef={searchRef}
      searchMobileIconRef={searchMobileIconRef}
      pathname={pathname}
      isMobile={isMobile}
    />
  </>
}
