"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { ProfileProps } from "../types/types";
import Image from "next/image";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";

const logo = "/images/logo-text-free.png";
const searchGlass = "/images/search-glass.svg";
const profilePicture = "/images/profile-picture.png";
const addRecipe = "/images/add.svg";
const dropdownIcon = "/images/arrow-down.png";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [users, setUsers] = useState<ProfileProps[]>([]);
  const [recipes, setRecipes] = useState<SimplifiedRecipeProps[]>([]);
  const [searchResults, setSearchResults] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

  const { user, logout, isAuthenticated, initializing } = useAuth();
  
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target as Node)
    ) {
      setSearchResults(false);
    }
  }, []);

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
        try {
          const res = await fetch(`/api/search?search=${debouncedSearch}`, {
            method: "GET",
          });
          if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
          }
          const data = await res.json();
          setSearchResults(true);
          setUsers(data.existingUsers);
          setRecipes(data.existingRecipes);
        } catch (error: any) {
          console.error("Error:", error.message);
        }
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

  return (
    !initializing && (
      <>
        <div className="space"></div>
        <div className="navContainer">
          <Link href={"/"}>
            <Image
              id="logo"
              src={logo}
              alt="logo"
              width={24}
              height={24}
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
            />
            <input
              type="search"
              name="query"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            {searchResults && (users.length > 0 || recipes.length > 0) && (
              <div
                className="searchedUsersContainer"
                data-testid="searchedUsersContainer"
                ref={searchResultsRef}
              >
                {users.length > 0 && (
                  <>
                    <h1>Users</h1>
                    {users.map((user, indexKey) => (
                      <Link href={`/${user.username}`} key={indexKey}>
                        <div
                          className="searchedUser"
                          data-testid="searchedUser"
                        >
                          <Image
                            height={42}
                            width={42}
                            src={
                              user.userContent?.profilePicture || profilePicture
                            }
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
                    {recipes.map((recipe, indexKey) => (
                      <Link
                        href={`/${recipe.user?.username}/${recipe._id}`}
                        key={indexKey}
                      >
                        <div
                          className="searchedUser"
                          data-testid="searchedUser"
                        >
                          <Image
                            height={42}
                            width={42}
                            src={recipe.image}
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

          {isAuthenticated && user ? (
            <>
              <Link className="addRecipe shrink-0" href="/add-recipe">
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
              >
                <Image
                  height={35}
                  width={35}
                  src={user.userContent?.profilePicture || profilePicture}
                  alt="profile-picture"
                />
              </Link>
              <div className="dropdownContainer" ref={dropdownRef}>
                <Image
                  className={`dropdownButton ${isOpen ? "open" : ""}`}
                  src={dropdownIcon}
                  width={24}
                  height={24}
                  alt="drop-down-menu"
                  onClick={toggleDropdown}
                />
                {isOpen && (
                  <div className="dropdownContentContainer">
                    <div className="dropdownContent">
                      <Link href="/settings">Settings</Link>
                      <button onClick={logout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="newUserButtons">
              <Link href="/">
                <button>Login</button>
              </Link>
              <Link href="/register">
                <button>Register</button>
              </Link>
            </div>
          )}
        </div>
      </>
    )
  );
}
