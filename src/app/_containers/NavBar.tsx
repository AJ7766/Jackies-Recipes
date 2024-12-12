"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { UserProps } from "@/_models/UserModel";
import { fetchGetSearchAPI } from "../_services/api/fetchGetSearchAPI";
import { NavBarComponent } from "../_components/NavBarComponent";
import { usePathname } from "next/navigation";
import { checkNavBar, handleDropdown, handleMobileSearch } from "../_services/navBarServices";
import Search from "./Search";

export default function NavBar({ isAuth }: { isAuth: boolean }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
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

  if (!checkNavBar(pathname, isAuth))
    return null;

  const handleClickOutside = useCallback((e: MouseEvent) => {
    handleMobileSearch(e, searchMobileIconRef, searchMobileRef);
    handleDropdown(e, dropdownIconRef, dropdownRef, dropdownItemsRef);

    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target as Node)) {
      setUsers([]);
      setRecipes([]);
      setSearch('');
      setDebouncedSearch('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const clickHandler = () => {
    setUsers([]);
    setRecipes([]);
    setSearch('');
    setDebouncedSearch('');
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      const fetchData = async () => {
        const { message, fetchedUsers, fetchedRecipes } = await fetchGetSearchAPI(debouncedSearch);

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
  }, [debouncedSearch]);

  return <>
    <Search searchMobileRef={searchMobileRef} />
    <NavBarComponent user={user} isAuth={isAuth} search={search} setSearch={setSearch} users={users} recipes={recipes} searchResultsRef={searchResultsRef} dropdownRef={dropdownRef} dropdownIconRef={dropdownIconRef} dropdownItemsRef={dropdownItemsRef} clickHandler={clickHandler} logout={logout} navBarRef={navBarRef} searchRef={searchRef} searchMobileIconRef={searchMobileIconRef} pathname={pathname} />
  </>
}
