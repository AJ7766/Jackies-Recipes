"use client"

import NavBar from "../[username]/_components/NavBar";
import { useAuth } from "@/app/context/AuthContext";
import EditProfile from "./_components/EditProfile";

export default function SettingsPage(){
    const {user} = useAuth();
    
    return(<>
    <NavBar />
    <EditProfile user={user}/>
    </>
    )
}