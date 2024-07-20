"use client"
import Image from "next/image";
import searchGlass from "@/app/images/search-glass.svg";
import profilePicture from "@/app/images/profile-picture.png";
import { useEffect, useState } from "react";
import Link from "next/link";

export default  function NavBar(){
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        if(debouncedSearch){
            const fetchData = async () => {
            try {
                const res = await fetch("/api/search", {
                method: "POST",
                body: JSON.stringify({ search: debouncedSearch }),
                headers: {
                  "Content-Type": "application/json"
                }
                });
              if (!res.ok) {
                throw new Error(`Failed to fetch profile: ${res.status} - ${res.statusText}`);
              }
              const data = await res.json();
            } catch (error:any) {
              console.error("Error fetching profile:", error.message);
            }finally{
            }
        }
        fetchData();
    }
    },[debouncedSearch])

    return(
        <div className="navContainer">
        <Link href="/"><p>Logo</p></Link>
        <Link href="/"><p>Home</p></Link>
        <div className="searchContainer">
        <Image src={searchGlass} alt="search-glass"/>
        <input type="search" name="query" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        </div>
        <div className="navProfilePictureContainer">
        <div className="navProfilePicutre">
        <Image src={profilePicture} alt="profile-picture" />
        </div>
        </div>
        <div className="accountSettings">
            <i className="arrowDown"></i>
        </div>
        </div>
    )
}