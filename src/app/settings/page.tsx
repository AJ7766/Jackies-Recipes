"use client"

import NavBar from "../_components/NavBar";
import { useAuth } from "@/app/authContext/AuthContext";
import EditProfile from "./_components/EditProfile";
import { useEffect, useState } from "react";
import {  ProfilePropsOrNull } from "../types/types";

export default function SettingsPage(){
    const [fetchedUser, setFetchedUser] = useState<ProfilePropsOrNull>();
    const {user} = useAuth();
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user) {
                    setFetchedUser(user);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, [user]);

    return(<>
    <NavBar />
    <EditProfile user={fetchedUser}/>
    </>
    )
}