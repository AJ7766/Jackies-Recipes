"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { RecipePopulatedProps } from "@/_models/RecipeModel";
import { UserProps } from "@/_models/UserModel";
import { fetchGetSearchAPI } from "../_services/api/fetchGetSearchAPI";
import { NavBarComponent } from "../_components/NavBarComponent";
import { usePathname } from "next/navigation";
import { checkNavBar } from "../_services/navBarServices";

export default function NavBar({ isAuth }: { isAuth: boolean }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [recipes, setRecipes] = useState<RecipePopulatedProps[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
    if (
      (searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node))
    ) {
      setUsers([]);
      setRecipes([]);
      setSearch('');
      setDebouncedSearch('');
    }
  }, []);

  const clickHandler = () => {
    setUsers([]);
    setRecipes([]);
    setSearch('');
    setDebouncedSearch('');
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  if (!checkNavBar(pathname, isAuth))
    return null;


  return <NavBarComponent user={user} isAuth={isAuth} search={search} setSearch={setSearch} users={users} recipes={recipes} isOpen={isOpen} searchResultsRef={searchResultsRef} dropdownRef={dropdownRef} clickHandler={clickHandler} toggleDropdown={toggleDropdown} closeDropdown={closeDropdown} logout={logout} />
}
