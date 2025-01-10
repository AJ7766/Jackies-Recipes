"use client";
import { UserProps } from "@/_types/UserTypes";
import { fetchGetUserAPI } from "@/server/api/fetchGetUserAPI";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const defaultProfilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";

export const ProfileButton = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const pathname = usePathname(); // Hook is called here, not in activeLink
    const activeLink = (pathname: string, path: string) => {
        return pathname === path ? "active" : "";
    };

    useEffect(() => {
        const fetchUser = async () => {

            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                return;
            }
            const { fetchedUser, message } = await fetchGetUserAPI();

            if (!fetchedUser) {
                console.error(message)
                return;
            }
            
            sessionStorage.setItem("user", JSON.stringify(fetchedUser));
            setUser(fetchedUser);
            console.log(typeof fetchedUser, 'User:', user)
        }
        fetchUser();
    }, [])

    if (!user) {
        return (
            <div className="navBarComponent flex items-center space-x-2 animate-pulse">
                <div className="rounded-full bg-gray-300 h-[30px] w-[30px] justify-self-center"></div>
                <div className="hidden md:block bg-gray-300 h-4 w-16 rounded"></div>
            </div>
        );
    }

    return (
        <Link className="navBarComponent"
            href={`/${user?.username}`}
            prefetch={false}>
            <Image
                className="profilePicture"
                height={30}
                width={30}
                src={user?.userContent?.profilePicture || defaultProfilePicture}
                alt={`${user?.fullName}'s profile picture`}
                priority
            />
            <h2 className={`${activeLink(pathname, `/${user?.username}`)} hidden md:block`}>Profile</h2>
        </Link>
    );
};
