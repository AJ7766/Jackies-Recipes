import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { ProfileProps } from "../types/types";
import Image from "next/image";

const searchGlass = "/images/search-glass.svg";
const profilePicture = "/images/profile-picture.png";
const addRecipe = "/images/add.svg";
const logo = "/images/logo-text-free.png";
const dropdownIcon = "/images/arrow-down.png";

export default  function NavBar(){
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [users, setUsers] = useState<ProfileProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearcResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const searchResultsRef = useRef<HTMLDivElement | null>(null);

    const { user, logout, isAuthenticated, initializing } = useAuth();

    useEffect(() => {
      if (!initializing) {
          setLoading(false);
      }
  }, [initializing]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
      setSearcResults(false);
    }
  }, []);

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
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
        if(debouncedSearch){
            const fetchData = async () => {
            try {
                const res = await fetch("/api/search", {
                method: "POST",
                body: JSON.stringify({ username: debouncedSearch }),
                headers: {
                  "Content-Type": "application/json"
                }
                });
              if (!res.ok) {
                throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
              }
              const data = await res.json();
              setSearcResults(true);
              setUsers(data.existingUsers);
            } catch (error:any) {
              console.error("Error fetching profile:", error.message);
            }finally{
            }
        }
        fetchData();
    }else{
      setUsers([]);
    }
    },[debouncedSearch])

    function toggleDropdown(){
      setIsOpen(!isOpen);
    };

    if (loading) {
      return (
      <>
        <div className="space"></div>
        <div className="navContainer">
        <Link href={`/${user?.username}`}>
        <Image id="logo" className="loginLogo" src={logo} alt="logo" width={24} height={24} />
        </Link>
        <div className="searchContainer">
        <Image src={searchGlass} id="searchGlass" alt="search-glass" width={24} height={24}/>
        <input type="search" name="query" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        {searchResults && users.length > 0 &&
        <div className="searchedUsersContainer" ref={searchResultsRef}>
        {users.map((user, indexKey) => (
      <Link href={`/${user.username}`} key={indexKey}>
        <div className="searchedUser">
          <Image height={42} width={42} src={user.userContent?.profilePicture || profilePicture} alt="profile-picture"/>
          <div>
          <h2>{user.username}</h2>
          <p>{user.fullName}</p>
          </div>
        </div>
        </Link>
      ))}
        </div>} 
        </div>
        <div>Loading...</div> 
        </div>
        </>)
  }
  
    return(
        <>
        <div className="space"></div>
        <div className="navContainer">
        <Link href={`/${user?.username}`}>
        <Image id="logo" className="loginLogo" src={logo} alt="logo" width={24} height={24}/>
        </Link>
        <div className="searchContainer">
        <Image src={searchGlass} id="searchGlass" alt="search-glass" width={24} height={24}/>
        <input type="search" name="query" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        {searchResults && users.length > 0 &&
        <div className="searchedUsersContainer" ref={searchResultsRef}>
        {users.map((user, indexKey) => (
      <Link href={`/${user.username}`} key={indexKey}>
        <div className="searchedUser">
          <Image height={42} width={42} src={user.userContent?.profilePicture || profilePicture} alt="profile-picture"/>
          <div>
          <h2>{user.username}</h2>
          <p>{user.fullName}</p>
          </div>
        </div>
        </Link>
      ))}
        </div>} 
        </div>
        {isAuthenticated ? <>
          <Link className="addRecipe shrink-0" href="/add-recipe">
        <Image height={32} width={32} src={addRecipe} alt="add-recipe"/>
          </Link>
        <Link className="profilePictureLink shrink-0" href={`/${user?.username}`}>
        <Image height={35} width={35} src={user?.userContent?.profilePicture || profilePicture} alt="profile-picture"/>
        </Link>
        <div className="dropdownContainer" ref={dropdownRef} >
        <Image className={`dropdownButton ${isOpen ? 'open' : ''}`} src={dropdownIcon} width={24} height={24} alt="drop-down-menu" onClick={toggleDropdown}/>
        {isOpen && (
          <div className="dropdownContentContainer">
        <div className="dropdownContent">
        <Link href="/settings">
          Settings
        </Link>
          <button onClick={logout}>Logout</button>
        </div>
        </div>
      )}
      </div>
      </>
      :
      <div className="newUserButtons">
        <Link href="/">
        <button>Login</button>
        </Link>
        <Link href="/register">
        <button>Register</button>
        </Link>
        </div>
        }
        </div>
        </>
    )
}
